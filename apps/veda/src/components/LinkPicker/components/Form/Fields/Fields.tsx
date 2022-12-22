import FieldGroup from 'components/FieldGroup';
import { useLinkPicker } from 'components/LinkPicker/store/context/LinkPickerContext';
import { PickerType } from 'components/LinkPicker/types';
import { removeTel } from 'components/LinkPicker/utils/getLinkType';
import Radio from 'components/Radio';
import TextInput from 'components/TextInput';
import Tooltip from 'components/Tooltip';
import withDebounce from 'hocs/withDebounce';
import { ReactNode, useEffect } from 'react';
import { i18n } from 'translation';
import { FontAwesome, View } from 'wiloke-react-core';
import { Custom } from './Custom';
import { Email } from './Email';
import { PhoneNumber } from './PhoneNumber';
import { Shopify } from './Shopify';
import * as styles from './styles';

export const DebounceTextInput = withDebounce(TextInput, 'value', 'onValueChange');

export const Fields = () => {
  const { type, label, summary, dispatch, value, AfterLabel } = useLinkPicker();

  useEffect(() => {
    if (type === 'phone') {
      if (value.includes('tel:')) {
        const _currentVal = removeTel(value);
        dispatch({
          type: '@LinkPicker/setSettings',
          payload: {
            value: `tel:${_currentVal}`,
          },
        });
      } else {
        dispatch({
          type: '@LinkPicker/setSettings',
          payload: {
            value: `tel:`,
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const _mappingContent: Record<PickerType, ReactNode> = {
    custom: <Custom />,
    email: <Email />,
    phone: <PhoneNumber />,
    shopify: <Shopify />,
  };

  const _handleChangeTab = (val: string) => {
    const _val = val as PickerType;
    dispatch({
      type: '@LinkPicker/setPickerType',
      payload: {
        type: _val,
      },
    });
  };

  const renderContent = (
    <View>
      <Radio.Group defaultValue={'settings.type'} value={type} block onChangeValue={_handleChangeTab}>
        <Radio.Button
          value="shopify"
          children={
            <Tooltip css={styles.tooltip} portal text="Shopify">
              <View css={styles.radioButton}>
                <FontAwesome type="fab" name="shopify" />
              </View>
            </Tooltip>
          }
        />
        <Radio.Button
          value="email"
          children={
            <Tooltip css={styles.tooltip} portal text={i18n.t('builderPage.send_email')}>
              <View css={styles.radioButton}>
                <FontAwesome type="far" name="envelope" />
              </View>
            </Tooltip>
          }
        />
        <Radio.Button
          value="phone"
          children={
            <Tooltip css={styles.tooltip} portal text={i18n.t('builderPage.phone_number')}>
              <View css={styles.radioButton}>
                <FontAwesome type="far" name="phone" />
              </View>
            </Tooltip>
          }
        />
        <Radio.Button
          value="custom"
          children={
            <Tooltip css={styles.tooltip} portal text={i18n.t('builderPage.custom_url')}>
              <View css={styles.radioButton}>
                <FontAwesome type="far" name="link" />
              </View>
            </Tooltip>
          }
        />
      </Radio.Group>

      {_mappingContent[type]}
    </View>
  );

  if (!label) {
    return renderContent;
  }

  return (
    <FieldGroup label={label} summary={summary} visible AfterLabel={AfterLabel}>
      {renderContent}
    </FieldGroup>
  );
};
