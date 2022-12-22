import BoxCenter from 'components/BoxCenter';
import SelectAntd from 'components/SelectAntd';
import TextInput from 'components/TextInput';
import VirtualList from 'components/VirtualList/VirtualList';
import { FC, useEffect, useRef, useState } from 'react';
import { useUnmount } from 'react-use';
import { List } from 'react-virtualized';
import { GridSmart, Text, View } from 'wiloke-react-core';
import { iconBrands, icons } from './icons';
import * as styles from './styles';
import { FontAwesomeBrand, FontAwesomeDefault, FontAwesomeType, IconUIFieldProps, FontType, IconValue } from './types';
import { isImage } from './Upload';

const NUMBER_OF_COL = 4;
const ROW_HEIGHT = 62;
const COL_GAP = 4;

export const FontIconField: FC<IconUIFieldProps> = ({ value = '<i class="fal fa-atom" />' as IconValue, onChange }) => {
  const iconFromValue = (isImage(value) ? '' : value.replace(/<i.*class=("|')(fa.*\s|)|("|').*>/g, '')) as FontAwesomeType;
  const iconTypeFromValue = (isImage(value) ? '' : value.replace(/<i.*class=("|')|\s(fa-|).*/g, '')) as FontType | 'fab';
  const [iconState, setIcon] = useState(iconFromValue);
  const [iconType, setIconType] = useState<FontType | 'fab'>(iconTypeFromValue || 'far');
  const [search, setSearch] = useState('');
  const iconValue: IconValue = `<i class="${iconType as FontType} ${iconState}"></i>`;
  const listRef = useRef<List | null>(null);
  const prevIconTypeRef = useRef(iconType);
  const mountedRef = useRef(false);

  const resetScroll = () => {
    listRef.current?.Grid?.scrollToPosition({ scrollTop: 0, scrollLeft: 0 });
  };

  useEffect(() => {
    setIcon(iconFromValue);
    if (!!iconTypeFromValue) {
      setIconType(iconTypeFromValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useUnmount(() => {
    // Nếu trường hợp icon không tồn tại ta sẽ quay trở lại icon type trước đó
    if (
      // icon không tồn tại trong mảng iconBrands
      (iconType === 'fab' && !iconBrands.includes(iconState as FontAwesomeBrand)) ||
      // icon không tồn tại trong mảng icons
      (['fas', 'far', 'fal'].includes(iconType) && !icons.includes(iconState as FontAwesomeDefault))
    ) {
      setIconType(prevIconTypeRef.current);
    }
  });

  useEffect(() => {
    if (mountedRef.current) {
      onChange?.(iconValue);
    } else {
      mountedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iconState, iconType]);

  const getIcons = (iconType: FontType | 'fab') => {
    const _icons = iconType === 'fab' ? iconBrands : icons;
    if (!!search) {
      return ((_icons as unknown) as string[]).filter(icon => icon.replace(/-/g, '').includes(search.toLowerCase().replace(/\s/g, '')));
    }
    return _icons;
  };

  const renderIconList = (iconType: FontType | 'fab') => {
    const _icons = getIcons(iconType);
    return (
      <VirtualList
        listRef={listRef}
        containerCss={{ height: 'calc(100% - 42px)', flex: 1 }}
        rowCount={icons.length / NUMBER_OF_COL + (icons.length % NUMBER_OF_COL > 0 ? 1 : 0)}
        rowHeight={ROW_HEIGHT}
        rowRender={index => {
          const rowItem = _icons.slice(index * NUMBER_OF_COL, index * NUMBER_OF_COL + NUMBER_OF_COL) as FontAwesomeType[];
          return (
            <GridSmart columnWidth={1} columnCount={NUMBER_OF_COL} columnGap={4}>
              {rowItem.map(icon => {
                return (
                  <BoxCenter
                    css={styles.iconWrap(ROW_HEIGHT - COL_GAP)}
                    key={icon}
                    onClick={() => {
                      setIcon(icon);
                    }}
                  >
                    <Text tagName="i" className={`${iconType} ${icon}`} css={styles.icon(icon === iconState)} />
                  </BoxCenter>
                );
              })}
            </GridSmart>
          );
        }}
      />
    );
  };

  return (
    <View css={styles.content}>
      <View css={styles.header}>
        <TextInput
          block
          placeholder="Search"
          onValueChange={value => {
            resetScroll();
            setSearch(value);
          }}
        />
        <View css={styles.select}>
          <SelectAntd
            value={iconType}
            data={[
              { label: 'Solid', value: 'fas' },
              { label: 'Regular', value: 'far' },
              { label: 'Light', value: 'fal' },
              { label: 'Brands', value: 'fab' },
            ]}
            onChange={value => {
              resetScroll();
              setIconType(value);
              prevIconTypeRef.current = iconType;
            }}
          />
        </View>
      </View>
      {renderIconList(iconType)}
    </View>
  );
};
