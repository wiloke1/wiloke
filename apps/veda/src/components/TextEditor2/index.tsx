import { EditorConfig } from '@ckeditor/ckeditor5-core/src/editor/editorconfig';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from '@duongto1998/custom-builder-ckeditor/build/ckeditor';
import { getColorTitle } from 'components/ColorPicker2/utils';
import { FC, useRef } from 'react';
import { useSelector } from 'react-redux';
import { cssVariablesSelector, pageDataSelector } from 'store/selectors';
import { i18n } from 'translation';
import { Unusable_Metafields } from 'types/Metafields';
import { CssColorVariable } from 'types/PresetStyles';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

export interface TextEditor2Props {
  value?: string;
  richText?: boolean;
  isPortal?: boolean;
  onChange?: (html: string) => void;
  onClickMetaField?: (editor?: any) => void;
}

const setAttributes = (el: HTMLElement, attrs: Record<string, any>) => {
  for (const key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};

const getEditorConfig = (colors: CssColorVariable[]): EditorConfig => ({
  toolbar: ['heading', '|', 'fontColor', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList'],
  link: {
    decorators: {
      isExternal: {
        mode: 'manual',
        label: i18n.t('general.open_new_tab'),
        attributes: {
          target: '_blank',
        },
      },
    },
  },
  fontColor: {
    colors: colors.map(item => ({
      color: item.light,
      label: getColorTitle(item.name),
    })),
    columns: 4,
    documentColors: 0,
  },
});

export const TextEditor2: FC<TextEditor2Props> = ({ value = '', richText = true, onChange, onClickMetaField }) => {
  const { colors } = useSelector(cssVariablesSelector);
  const page = useSelector(pageDataSelector);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canUseMetaField = page ? page.type === 'article' || page.type === 'collection' || page.type === 'product' : false;

  const handleChange = (_: any, editor: any) => {
    const data = editor.getData();
    // setValueState(data);
    onChange?.(data);
  };

  if (!richText) {
    return (
      <View css={styles.container}>
        <View
          css={styles.textarea}
          tagName="textarea"
          value={value}
          onChange={event => {
            const el = event.target as HTMLTextAreaElement;
            // setValueState(el.value);
            onChange?.(el.value);
          }}
        />
      </View>
    );
  }

  return (
    <View ref={containerRef} className="CKEditor-container" css={styles.container}>
      <CKEditor
        editor={Editor}
        config={getEditorConfig(colors)}
        data={value}
        onChange={handleChange}
        onReady={(editor: any) => {
          // Đợi ckeditor được khỏi tạo rồi append icon vào
          if (editor && containerRef.current) {
            const toolbarsEl = containerRef.current.querySelector('.ck-color-ui-dropdown') as HTMLButtonElement;
            const button = document.createElement('button');
            button.className = 'ck ck-button ck-off customEditorButton';
            toolbarsEl.style.paddingLeft = '0';
            setAttributes(button, {
              tabindex: -1,
              'aria-pressed': false,
              'data-cke-tooltip-position': 's',
              'data-cke-tooltip-text': canUseMetaField
                ? `Metafields (Not support types: ${Object.values(Unusable_Metafields).join(', ')})`
                : i18n.t('general.meta_field_use_in'),
            });
            if (!canUseMetaField) {
              button.style.opacity = '0.4';
            }
            const icon = document.createElement('i');
            icon.className = 'far fa-database ck-fontawesome';
            button.addEventListener('click', () => {
              if (canUseMetaField) {
                onClickMetaField?.(editor);
              }
            });
            button.appendChild(icon);

            toolbarsEl.before(button);
          }
        }}
      />
    </View>
  );
};
