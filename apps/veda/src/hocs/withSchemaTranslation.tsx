import { CssScrollBar } from 'components/CssScrollBar';
import elasticlunr from 'elasticlunr';
import { ComponentType, FC, useEffect, useState } from 'react';
import { usePopper } from 'react-popper';
import { camelToText } from 'utils/functions/camelToText';
import { createPortal } from 'utils/functions/createPortal';
import { objectKeys } from 'utils/functions/objectKeys';
import { en } from 'utils/functions/schemaTranslation/label/en';
import { snakeToText } from 'utils/functions/snakeToText';
import { View } from 'wiloke-react-core';

interface Search {
  id: string;
  label: string;
  value: string;
}

const index = elasticlunr<Search>(function() {
  this.addField('label');
  this.addField('value');
  this.setRef('id');
});

export const getLabel = (value: string) => {
  return snakeToText(camelToText(value)).trim();
};

export const withSchemaTranslation = <P extends any, T extends keyof P>(WrappedComponent: ComponentType<P>, propValue: keyof P, propOnChange: T) => {
  const WithDebounce: FC<Omit<P, T> & Record<T, (value: string, optionClicked: boolean) => void>> = props => {
    const [focused, setFocused] = useState(false);
    const [optionClicked, setOptionClicked] = useState(false);
    const [searchResult, setSearchResult] = useState<Search[]>([]);
    const [valueState, setValueState] = useState((props as any)[propValue] ?? '');
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement);
    const translation = objectKeys(en).map(item => ({ id: item, label: getLabel(item), value: item }));
    const data = searchResult.length > 0 ? searchResult : translation;

    const handleWindowClick = (event: MouseEvent) => {
      if (!referenceElement?.contains(event.target as Node)) {
        setFocused(false);
        setOptionClicked(false);
      }
    };

    useEffect(() => {
      window.addEventListener('click', handleWindowClick);
      return () => {
        window.removeEventListener('click', handleWindowClick);
      };
    });

    useEffect(() => {
      translation.forEach(item => {
        index.addDoc(item);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      setValueState((props as any)[propValue]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [(props as any)[propValue]]);

    useEffect(() => {
      if (focused) {
        setSearchResult(
          index.search(valueState, { expand: true }).map(({ ref }) => {
            return index.documentStore.getDoc(ref);
          }),
        );
      }
    }, [valueState, focused]);

    const handleChange = (value: string) => {
      setValueState(value);
      setFocused(true);
      setOptionClicked(false);
      (props as any)[propOnChange]?.(value, optionClicked);
    };

    const renderContent = () => {
      if (searchResult.some(item => item.value === valueState)) {
        return null;
      }
      return (
        <CssScrollBar
          innerRef={setPopperElement}
          backgroundColor="light"
          radius={6}
          css={({ colors }) => ({
            zIndex: '99999999999',
            width: `${referenceElement?.offsetWidth ?? 300}px`,
            maxHeight: '300px',
            margin: '5px 0',
            border: `1px solid ${colors.gray2}`,
            boxShadow: `0 5px 10px rgba(${colors.rgbGray9}, 0.1)`,
          })}
          style={styles.popper}
          {...attributes.popper}
        >
          {data.map(item => (
            <View
              key={item.id}
              css={({ colors, fonts }) => ({
                color: colors.gray8,
                fontFamily: fonts.secondary,
                fontSize: '13px',
                padding: '10px 12px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: colors.gray1,
                },
              })}
              onClick={() => {
                setValueState(item.value);
                setSearchResult([]);
                setOptionClicked(true);
              }}
            >
              {item.value}
            </View>
          ))}
        </CssScrollBar>
      );
    };

    return (
      <div
        ref={setReferenceElement}
        onClick={() => {
          setFocused(true);
        }}
      >
        <WrappedComponent {...(props as any)} {...{ [propOnChange]: handleChange, [propValue]: valueState }} />
        {focused && createPortal(renderContent())}
      </div>
    );
  };
  return WithDebounce;
};
