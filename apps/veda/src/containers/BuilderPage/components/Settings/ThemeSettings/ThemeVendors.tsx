import BoxCenter from 'components/BoxCenter';
import Button from 'components/Button';
import Field from 'components/Field';
import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { themeVendorsSelector, useAddThemeVendor, useDeleteThemeVendor, useUpdateThemeVendorValue } from 'store/global/themeVendors/slice';
import { i18n } from 'translation';
import { Vendor } from 'types/Result';
import { FontAwesome, View } from 'wiloke-react-core';
import * as styles from '../styles';

const TextInputDebounce = withDebounce(TextInput, 'value', 'onValueChange');

const ThemeVendors: FC = () => {
  const vendors = useSelector(themeVendorsSelector);
  const updateThemeVendorValue = useUpdateThemeVendorValue();
  const deleteThemeVendor = useDeleteThemeVendor();
  const addThemeVendor = useAddThemeVendor();

  const renderItem = (item: Vendor) => {
    return (
      <View key={item.id} css={styles.tr}>
        <View css={styles.tdItem}>
          <Field label="CSS">
            <TextInputDebounce
              block
              value={item.css}
              placeholder="Eg: https://example.css"
              onValueChange={value => {
                updateThemeVendorValue({
                  id: item.id,
                  css: value,
                });
              }}
            />
          </Field>
        </View>
        <View css={styles.tdItem}>
          <Field label="Javascript">
            <TextInputDebounce
              block
              value={item.js}
              placeholder="Eg: https://example.js"
              onValueChange={value => {
                updateThemeVendorValue({
                  id: item.id,
                  js: value,
                });
              }}
            />
          </Field>
        </View>
        <View css={styles.tdAction}>
          <BoxCenter
            size={46}
            backgroundColor="gray2"
            backgroundColorHover="gray3"
            radius={6}
            onClick={() => {
              // Nếu vendors chứa từ 2 phần tử trở lên thì có thể xoá
              // còn không chỉ reset css, js property
              if (vendors.length > 1) {
                deleteThemeVendor({ id: item.id });
              } else {
                updateThemeVendorValue({
                  id: item.id,
                  css: '',
                  js: '',
                });
              }
            }}
          >
            <FontAwesome type="fal" name="times" size={24} color="gray8" />
          </BoxCenter>
        </View>
      </View>
    );
  };

  const renderButton = (
    <View css={{ padding: '0 6px' }}>
      <Button
        backgroundColor="gray8"
        size="small"
        radius={6}
        fontFamily="secondary"
        css={{ fontWeight: 500 }}
        onClick={() => {
          addThemeVendor(undefined);
        }}
      >
        {i18n.t(`general.add`, {
          text: i18n.t('general.vendors'),
          textTransform: 'capitalize',
        })}
      </Button>
    </View>
  );

  return (
    <View css={{ marginLeft: '-6px', marginRight: '-6px' }}>
      {vendors.map(renderItem)}
      {renderButton}
    </View>
  );
};

export default ThemeVendors;
