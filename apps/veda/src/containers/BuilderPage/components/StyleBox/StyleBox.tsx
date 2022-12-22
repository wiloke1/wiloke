import SimpleTabs from 'components/SimpleTabs';
import _ from 'lodash';
import { FC, useRef, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { Base64 } from 'utils/functions/base64';
import { Animation } from './Animation';
import { SingleStyle, SingleStyleProps } from './SingleStyle';
import * as styles from './styles';
import { CSSProp } from './types';
import { getAnimateCss, getAnimateValue, styleParse } from './utils';

export interface StyleBoxProps extends Omit<SingleStyleProps, 'css' | 'onChange'> {
  value: string;
  onChange?: (value: string) => void;
}

// 1. set min max cho space field
const StyleBox: FC<StyleBoxProps> = ({ onChange, onAddOrEditColor, value, fonts, colors }) => {
  const [result, setResult] = useState(styleParse(Base64.decode(value)));
  const mountedRef = useRef(false);
  const { cssDefault, cssHover } = result;
  const [tabActive, setTabActive] = useState<'default' | 'hover'>('default');
  const isHover = tabActive === 'hover';

  useDeepCompareEffect(() => {
    if (mountedRef.current) {
      onChange?.(
        Base64.encode(
          JSON.stringify(result)
            .replace(/backgroundColor/g, 'background-color')
            .replace(/"/g, `'`),
        ),
      );
    }
    mountedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <>
      <SimpleTabs
        defaultValue="default"
        data={[
          { label: 'Default', value: 'default' },
          { label: 'Hover', value: 'hover' },
        ]}
        onChange={setTabActive}
        tabItemCss={styles.tabItem}
        tabCss={styles.tab}
      >
        {value => (
          <SingleStyle
            key={value}
            css={(isHover ? cssHover : cssDefault) ?? {}}
            colors={colors}
            fonts={fonts}
            onAddOrEditColor={onAddOrEditColor}
            onChange={css => {
              setResult(result => ({
                ...result,
                ...(isHover ? { cssHover: css } : { cssDefault: css }),
              }));
            }}
          />
        )}
      </SimpleTabs>
      {tabActive === 'default' && (
        <Animation
          value={getAnimateValue(result?.cssDefault?.animation)}
          onChange={value => {
            const animation = getAnimateCss(value);
            setResult(result => ({
              ...result,
              cssDefault: animation
                ? {
                    ...result.cssDefault,
                    animation,
                  }
                : (_.omit(result.cssDefault, 'animation') as CSSProp),
            }));
          }}
        />
      )}
    </>
  );
};

export default StyleBox;
