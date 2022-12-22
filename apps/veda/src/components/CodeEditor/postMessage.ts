import { CssVariables } from 'types/Result';
import { SectionSettings } from 'types/Schema';
import { createPostMessage } from 'wiloke-react-core/utils';

export interface MonacoError {
  isError: boolean;
  language: string;
}

export interface ChildrenOnMessage {
  '@codeEditor/onChange': {
    id: string;
    value: string;
  };
  '@codeEditor/onSave': {
    id: string;
    value: string;
  };
  '@codeEditor/editorLoaded': boolean;
}

export interface ChildrenEmitMessage {
  '@codeEditor/id': string;
  '@codeEditor/value': string;
  '@codeEditor/language': 'liquid' | 'scss' | 'javascript' | 'json' | 'typescript';
  '@codeEditor/cssVariables': CssVariables;
  '@codeEditor/translation': Record<string, any>;
  '@codeEditor/sectionSettings': SectionSettings;
  '@codeEditor/classNamesSuggestions': string[];
  '@codeEditor/liquidSnippets': Record<string, string>;
  '@codeEditor/options': any;
}

export const postMessage = createPostMessage<ChildrenEmitMessage, ChildrenOnMessage>({
  is: 'parent',
  iframeSelector: '#iframe-code-editor',
  url: '*',
});
