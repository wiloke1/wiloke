import { FontAwesome, View } from 'wiloke-react-core';
import { useSelector } from 'react-redux';
import Empty from 'components/Empty';
import Button from 'components/Button';
import { i18n } from 'translation';
import ScrollBars from 'components/ScrollBars';
import { v4 } from 'uuid';
import Field from 'components/Field';
import TextInput from 'components/TextInput';
import withDebounce from 'hocs/withDebounce';
import { PageSettings, Vendor } from 'types/Result';
import BoxCenter from 'components/BoxCenter';
import { dashboardPageSettingsSelector, useChangeSettingsDashboardPage } from '..';
import * as styles from '../styles';

const TextInputDebounce = withDebounce(TextInput, 'value', 'onValueChange');

export const VendorSettings = () => {
  const { page } = useSelector(dashboardPageSettingsSelector);
  const changeSettings = useChangeSettingsDashboardPage();

  if (page) {
    const pageSettings = page?.pageSettings as PageSettings;
    const vendors = pageSettings.vendors;

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
                  changeSettings({
                    page: {
                      ...page,
                      pageSettings: {
                        ...pageSettings,
                        vendors: vendors.map(ven => {
                          if (ven.id === item.id) {
                            return {
                              ...ven,
                              css: value,
                            };
                          }
                          return ven;
                        }),
                      },
                    },
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
                  changeSettings({
                    page: {
                      ...page,
                      pageSettings: {
                        ...pageSettings,
                        vendors: vendors.map(ven => {
                          if (ven.id === item.id) {
                            return {
                              ...ven,
                              js: value,
                            };
                          }
                          return ven;
                        }),
                      },
                    },
                  });
                }}
              />
            </Field>
          </View>
          <View css={{ ...styles.tdAction, marginBottom: 0, marginTop: '12px' }}>
            <BoxCenter
              size={46}
              backgroundColor="gray2"
              backgroundColorHover="gray3"
              radius={6}
              onClick={() => {
                changeSettings({
                  page: {
                    ...page,
                    pageSettings: {
                      ...pageSettings,
                      vendors: vendors.filter(ven => ven.id !== item.id),
                    },
                  },
                });
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
            changeSettings({
              page: {
                ...page,
                pageSettings: {
                  ...pageSettings,
                  vendors: [...vendors, { id: v4(), css: '', js: '' }],
                },
              },
            });
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
      <ScrollBars css={{ width: '100%' }}>
        <View css={{ padding: '20px', flex: 1 }}>
          {vendors.map(renderItem)}
          {renderButton}
        </View>
      </ScrollBars>
    );
  }

  return <Empty />;
};
