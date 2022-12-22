import { FC } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { pageSectionsSelector } from 'store/selectors';
import Emitter, { Observers } from 'utils/functions/Emitter';
import { pmChildren } from 'utils/functions/postMessage';
import { useIframeSelector } from '../hooks/useIframeSelector';

export interface Events {
  redirectToHooks: (url: string) => void;
}

export type EventsObservers = { [key in keyof Events]: Observers<Events[key]> };

const eventEmitter = new Emitter<EventsObservers>();

window.redirectTo = eventEmitter.emit.bind(eventEmitter, 'redirectToHooks');

export const RedirectToHooks: FC = () => {
  const sections = useIframeSelector(pageSectionsSelector);

  useDeepCompareEffect(() => {
    const id = eventEmitter.on('redirectToHooks', url => {
      pmChildren.emit('@redirectToHooks', url);
    });
    return () => {
      eventEmitter.off(id);
    };
  }, [sections]);

  return null;
};
