import { CodeEditorProps } from 'components/CodeEditor/CodeEditor';
import { i18n } from 'translation';
import { Consts } from 'utils/constants/constants';
import { TabValue } from './types';

export const getLanguage = (tabValue: TabValue): CodeEditorProps['language'] => {
  switch (tabValue) {
    case 'scss':
      return 'scss';
    case 'js':
    case 'jsHook':
      return 'javascript';
    case 'liquid':
    default:
      return 'liquid';
  }
};

export const getValue = (tabValue: TabValue, liquid: string, scss: string, js: string, jsHook: string): string => {
  switch (tabValue) {
    case 'scss':
      return scss;
    case 'js':
      return js;
    case 'jsHook':
      return jsHook.replace(Consts.JsHookComment, i18n.t('builderPage.js_hook_state'));
    case 'liquid':
      return liquid;
    default:
      return '';
  }
};
