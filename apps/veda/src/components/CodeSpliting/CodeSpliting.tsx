import { lazy, LazyExoticComponent, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { isPreviewPage } from 'utils/isPreviewPage';
import { ErrorBoundary, Loading } from './components';
import { AnyComponent, Props } from './types';
import { delay, retry } from './utils';

type CacheRecord = LazyExoticComponent<React.ComponentType<any>>;

const cache = new Map<string, CacheRecord>();
export const CodeSpliting = <TComponent extends AnyComponent>({ component, CHUNK_ID, devMode = false, ...props }: Props<TComponent>) => {
  const keyInCache = useMemo(() => {
    if (CHUNK_ID) {
      return CHUNK_ID;
    }
    return component.toString();
  }, [component, CHUNK_ID]);

  const [Component, setComponent] = useState(() => {
    return cache.get(keyInCache);
  });

  const handleLoadComponent = useCallback(() => {
    const _component = lazy(async () => {
      if (devMode) {
        await delay(1000);
        const randomNumber = Math.floor(Math.random() * 10);
        const shouldError = randomNumber > 4;
        if (shouldError) {
          return Promise.reject(new Error('Throw error by dev mode'));
        }
        return retry(component);
      }
      return retry(component);
    });
    return _component;
  }, [component, devMode]);

  const handleLoadComponentWithCache = useCallback(() => {
    if (cache.has(keyInCache)) {
      return cache.get(keyInCache);
    }
    const _component = handleLoadComponent();
    cache.set(keyInCache, _component);
    return _component;
  }, [handleLoadComponent, keyInCache]);

  const handleRetryLoadComponent = useCallback(() => {
    setComponent(handleLoadComponentWithCache());
  }, [handleLoadComponentWithCache]);

  const handleLoadComponentError = useCallback(() => {
    cache.delete(keyInCache);
  }, [keyInCache]);

  useEffect(() => {
    setComponent(handleLoadComponentWithCache());
  }, [handleLoadComponentWithCache]);

  return (
    <ErrorBoundary onError={handleLoadComponentError} onRetry={handleRetryLoadComponent}>
      <Suspense fallback={isPreviewPage() ? null : <Loading />}>{Component && <Component {...props} />}</Suspense>
    </ErrorBoundary>
  );
};
