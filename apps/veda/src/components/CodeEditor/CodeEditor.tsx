import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDeepCompareEffect } from 'react-use';
import { liquidSnippetsSelector } from 'store/global/globalSnippets/sliceGlobalSnippets';
import { cssVariablesSelector, themeSettingsSelector } from 'store/selectors';
import { SectionSettings } from 'types/Schema';
import { PageSection } from 'types/Sections';
import { isSectionAddons, isSectionMegamenu } from 'utils/functions/checkSectionType';
import { objectParse } from 'utils/functions/objectParse';
import { getErrorOfCodeLiquid } from 'utils/LiquidSyntaxToTwig/getExceptionOfCodeLiquid';
import { ProgressLoader, useStyleSheet, View } from 'wiloke-react-core';
import { MonacoError, postMessage } from './postMessage';
import { Skeleton } from './Skeleton';

export type CodeEditorLanguage = 'liquid' | 'scss' | 'javascript' | 'json' | 'typescript';

export interface CodeEditorProps {
  id: string;
  value: string;
  language: CodeEditorLanguage;
  sectionSettings?: SectionSettings;
  sectionCoding?: PageSection;
  /** monaco.editor.IDiffEditorConstructionOptions */
  options?: any;
  onLoaded?: () => void;
  onChange?: (value: string) => void;
  onSave?: (value: string) => void;
}

export const monacoCheckerAsync = async (lang: string, isSaveEvent: boolean) => {
  const iframeEl = document.querySelector<HTMLIFrameElement>(`#iframe-code-editor`);
  if (iframeEl?.contentWindow) {
    const error = await iframeEl.contentWindow.monacoCheckerAsync(lang, isSaveEvent);
    return error as MonacoError;
  }
};

export const CodeEditor: FC<CodeEditorProps> = ({
  id,
  value,
  language = 'liquid',
  sectionSettings = [],
  sectionCoding,
  options,
  onLoaded,
  onChange,
  onSave,
}) => {
  const [loaded, setLoaded] = useState(false);
  const cssVariables = useSelector(cssVariablesSelector);
  const liquidSnippets = useSelector(liquidSnippetsSelector);
  const containerRef = useRef<HTMLIFrameElement | null>(null);
  const { styles } = useStyleSheet();
  const themeSettings = useSelector(themeSettingsSelector);
  const languageRef = useRef(language);
  const idRef = useRef(id);

  useEffect(() => {
    if (containerRef.current?.contentWindow && sectionCoding && language === 'liquid') {
      containerRef.current.contentWindow.getErrorOfCodeLiquid = ({ liquid, checkShopifyVariable, cb }) => {
        return getErrorOfCodeLiquid({
          liquid,
          checkShopifyVariable,
          cb,
          settings: sectionCoding.data.settings,
          variant: isSectionAddons(sectionCoding.type)
            ? 'addon -> cần compile'
            : isSectionMegamenu(sectionCoding.type)
            ? 'megamenu -> cần compile'
            : 'section -> compile navigation',
        });
      };
    }
  }, [sectionCoding, language]);

  useEffect(() => {
    if (loaded) {
      postMessage.emit('@codeEditor/value', value);
    }
    // Cần thay đổi theo id nếu theo value sẽ bị vòng lặp
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, loaded]);

  useEffect(() => {
    if (loaded) {
      postMessage.emit('@codeEditor/id', id);
    }
  }, [id, loaded]);

  useDeepCompareEffect(() => {
    if (loaded) {
      postMessage.emit('@codeEditor/cssVariables', cssVariables);
    }
  }, [cssVariables, [loaded]]);

  useDeepCompareEffect(() => {
    if (loaded) {
      postMessage.emit('@codeEditor/liquidSnippets', liquidSnippets.data);
    }
  }, [liquidSnippets, [loaded]]);

  useDeepCompareEffect(() => {
    if (loaded) {
      postMessage.emit('@codeEditor/classNamesSuggestions', []);
    }
  }, [[loaded]]);

  useDeepCompareEffect(() => {
    if (loaded) {
      postMessage.emit('@codeEditor/language', language);
    }
  }, [language, [loaded]]);

  useDeepCompareEffect(() => {
    if (loaded) {
      postMessage.emit('@codeEditor/sectionSettings', sectionSettings);
    }
  }, [sectionSettings, [loaded]]);

  useDeepCompareEffect(() => {
    if (loaded) {
      postMessage.emit('@codeEditor/options', options);
    }
  }, [options, [loaded]]);

  useDeepCompareEffect(() => {
    if (loaded) {
      const translation = Object.values(themeSettings.globalTranslations.translation)[0];
      const translationObj = translation ? objectParse(translation) : {};
      postMessage.emit('@codeEditor/translation', translationObj);
    }
  }, [themeSettings, [loaded]]);

  useEffect(() => {
    const off1 = postMessage.on('@codeEditor/onChange', ({ id: _id, value }) => {
      if (_id === id && !options?.readonly) {
        onChange?.(value);
      }
    });
    const off2 = postMessage.on('@codeEditor/onSave', ({ id: _id, value }) => {
      if (_id === id && !options?.readonly) {
        onSave?.(value);
      }
    });
    const off3 = postMessage.on('@codeEditor/editorLoaded', () => {
      onLoaded?.();
      setLoaded(true);
    });

    return () => {
      off1();
      off2();
      off3();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <View css={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <ProgressLoader
        containerClassName={styles({ position: 'absolute', top: '0', left: '0', width: '100%', zIndex: 9 })}
        done={loaded}
        color="secondary"
      />
      {!loaded && <Skeleton />}
      <View
        id="iframe-code-editor"
        ref={containerRef}
        tagName="iframe"
        css={{ width: '100%', height: '100%', border: 'none', backgroundColor: '#2b2c4d' }}
        src={`/code-editor.html?lang=${languageRef.current}&id=${idRef.current}`}
      />
    </View>
  );
};
