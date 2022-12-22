import SelectAntd, { Option, SelectAntdProps } from 'components/SelectAntd';
import { FC, useEffect } from 'react';
import { createGlobalState } from 'react-use';
import { debounce } from 'utils/functions/debounce';
import WebFont from 'webfontloader';
import { ActivityIndicator, useStyleSheet, useTheme, View } from 'wiloke-react-core';
import { classNames } from 'wiloke-react-core/utils';
import googleFonts from './googleFonts';
import * as styles from './styles';

export type GoogleFonts = typeof googleFonts[number];

export interface FontFieldProps extends Omit<SelectAntdProps, 'setOptionStyle' | 'onChange'> {
  /** Sự kiện khi chọn 1 option */
  onChange?: (value: string) => void;
  onStartAddFont?: (fonts: string[]) => void;
  onFailedAddFont?: (fonts: string[]) => void;
  value?: string;
  fonts?: GoogleFonts[];
}

const useGlobalState = createGlobalState<string[]>([]);

const queue: Option[] = [];
let timeout: number | undefined = undefined;

const FontField: FC<FontFieldProps> = ({
  fonts,
  defaultValue = '',
  style,
  onChange,
  className,
  value = '',
  onFailedAddFont,
  onStartAddFont,
  ...rest
}) => {
  const { colors } = useTheme();
  const { styles: styleHooks } = useStyleSheet(colors);
  const [fontLoadedState, setFontLoaded] = useGlobalState();

  const handleLoadFont = (data: Option[]) => {
    const fonts = data.map(item => item.value) as string[];
    const fontsNeedLoad = fonts.filter(font => !fontLoadedState.includes(font));
    if (fontsNeedLoad.length > 0) {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        WebFont.load({
          google: {
            families: [...fontsNeedLoad.map(font => font)],
          },
          active() {
            setFontLoaded(fontLoadedState => [...fontLoadedState, ...fontsNeedLoad]);
          },
          loading() {
            onStartAddFont?.(fontsNeedLoad);
          },
          inactive() {
            onFailedAddFont?.(fontsNeedLoad);
          },
        });
      }, 200);
    }
  };

  useEffect(() => {
    const data: Option[] = [{ label: value, value }];
    queue.push(...data);
    handleLoadFont(queue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleLoadFonts = () => {
    const itemElement = Array.from(document.querySelectorAll('.ant-select-item.ant-select-item-option'));
    const fonts = (itemElement as HTMLElement[]).map(item => ({ label: item.innerText, value: item.innerText }));
    queue.push(...fonts);
    handleLoadFont(queue);
  };

  return (
    <SelectAntd
      {...rest}
      showSearch
      listItemHeight={35}
      data={[
        {
          label: 'Unset',
          value: '',
        },
        ...(fonts ?? googleFonts).map(item => ({ label: item, value: item })),
      ]}
      defaultValue={value || defaultValue}
      value={value}
      style={{ ...style, fontFamily: value || defaultValue }}
      getPopupContainer={trigger => trigger.parentElement}
      renderOption={item => {
        return (
          <View css={styles.font}>
            <View style={{ ...(item.value ? { fontFamily: `"${item.value}"` } : {}), fontSize: 20, paddingTop: 10, paddingBottom: 10 }}>
              {item.label}
            </View>
            {!fontLoadedState.includes(item.label) && item.value && (
              <ActivityIndicator className={styleHooks(styles.loadingIcon)} size={16} color="gray4" />
            )}
          </View>
        );
      }}
      className={classNames(className, styleHooks(styles.select))}
      dropdownClassName={styleHooks(styles.dropdown)}
      onChange={onChange}
      onSearch={debounce(handleLoadFonts, 100)}
      onPopupScroll={debounce(handleLoadFonts, 100)}
      onDropdownVisibleChange={open => open && debounce(handleLoadFonts, 100)()}
    />
  );
};

export default FontField;
