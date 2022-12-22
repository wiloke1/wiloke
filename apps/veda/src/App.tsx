import { AppContent } from 'containers/AppContent';
import { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Routes from 'routes';
import { persistor } from './store/configureStore';

const App: FC = () => {
  useEffect(() => {
    if (!['/iframe', '/preview'].includes(window.location.pathname)) {
      if (process.env.NODE_ENV === 'development') {
        require('antd/lib/select/style/css');
        require('antd/lib/message/style/css');
        require('antd/lib/popover/style/css');
        require('antd/lib/modal/style/css');
        require('antd/lib/dropdown/style/css');
        require('antd/lib/tooltip/style/css');
        require('antd/lib/upload/style/css');
        require('antd/lib/notification/style/css');
        require('react-sortable-tree/style.css');
        require('antd/lib/progress/style/css');
        require('antd/lib/table/style/css');
        require('antd/lib/collapse/style/css');
      } else {
        // @ts-ignore
        import('antd/lib/select/style/css');
        // @ts-ignore
        import('antd/lib/message/style/css');
        // @ts-ignore
        import('antd/lib/popover/style/css');
        // @ts-ignore
        import('antd/lib/modal/style/css');
        // @ts-ignore
        import('antd/lib/dropdown/style/css');
        // @ts-ignore
        import('antd/lib/tooltip/style/css');
        // @ts-ignore
        import('antd/lib/upload/style/css');
        // @ts-ignore
        import('antd/lib/notification/style/css');
        // @ts-ignore
        import('react-sortable-tree/style.css');
        // @ts-ignore
        import('antd/lib/progress/style/css');
        // @ts-ignore
        import('antd/lib/table/style/css');
        // @ts-ignore
        import('antd/lib/collapse/style/css');
      }
    }
  }, []);

  if (!persistor) {
    return (
      <Provider store={window.store}>
        <AppContent>
          <Routes />
        </AppContent>
      </Provider>
    );
  }

  return (
    <Provider store={window.store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <AppContent>
          <Routes />
        </AppContent>
      </PersistGate>
    </Provider>
  );
};

export default App;
