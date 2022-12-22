import Checkbox, { CheckboxProps } from 'components/Checkbox';
import { Confirm } from 'components/Confirm/Confirm';
import Box from 'components/FieldBox';
import LazyImage from 'components/LazyImage';
import Switch, { SwitchProps } from 'components/Switch';
import Tooltip from 'components/Tooltip';
import { AdminPageData } from 'containers/Admin/types';
import { FC, memo, ReactNode, useCallback } from 'react';
import { i18n } from 'translation';
import { PreviewImage } from 'types/Page';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface DataType extends AdminPageData {
  label: string;
  image?: PreviewImage;
  enable: boolean;
}

export interface StatisticBoxProps {
  label: string;
  image?: PreviewImage;
  enable: boolean;
  Right?: ReactNode;
  date?: string;
  loading?: boolean;
  selected?: boolean;
  hotpot?: ReactNode;
  onSelected?: CheckboxProps['onValueChange'];
  onActive?: SwitchProps['onValueChange'];
  onGotoPage?: () => void;
  onEditSettings?: () => void;
  onDelete?: () => void;
}

const BoxContent: FC<StatisticBoxProps> = ({
  loading = false,
  selected = false,
  date,
  Right,
  hotpot,
  enable,
  label,
  image,
  onSelected,
  onActive,
  onGotoPage,
  onEditSettings,
  onDelete,
}) => {
  const handleSelected = useCallback(
    (value: boolean) => {
      onSelected?.(value);
    },
    [onSelected],
  );

  return (
    <Box borderWidth={0} backgroundColor="light" className="StatisticCard-Container" radius={0} css={styles.itemContainer}>
      <View row css={{ alignItems: 'center', flexWrap: 'nowrap' }}>
        <View css={styles.checkbox}>
          <Checkbox size="small" activeColor="primary" checked={selected} onValueChange={handleSelected} />
        </View>

        <View css={styles.imageContainer} radius={3} onClick={onGotoPage}>
          <LazyImage src={image?.src} ratioPercent={70} />
        </View>

        <View css={styles.title} onClick={onGotoPage}>
          <Text numberOfLines={1} tagName="h6" css={{ fontWeight: 400 }}>
            {label}
          </Text>
          {hotpot}
        </View>

        <View css={styles.date}>
          <Text numberOfLines={1} css={{ fontWeight: 400 }}>
            {date}
          </Text>
        </View>

        <View css={styles.status}>
          <Switch loading={loading} onValueChange={onActive} checked={enable} />
        </View>

        <View css={styles.actions}>
          {Right}
          <Tooltip portal text={i18n.t('general.settings', { text: i18n.t('general.page') })}>
            <View borderColor="gray3" borderStyle="solid" borderWidth={1} css={styles.rightItem} onClick={onEditSettings}>
              <FontAwesome name="cog" type="far" />
            </View>
          </Tooltip>

          <Confirm
            isLoading={loading}
            title={`${i18n.t('general.delete', { text: i18n.t('general.confirm') })}`}
            message={i18n.t('general.delete_confirm_message', { text: label })}
            onOk={onClose => {
              onClose();
              onDelete?.();
            }}
          >
            <Tooltip text={i18n.t('general.delete', { text: i18n.t('general.page') })}>
              <View borderColor="gray3" borderStyle="solid" borderWidth={1} css={styles.rightItem}>
                <FontAwesome name="trash-alt" type="far" />
              </View>
            </Tooltip>
          </Confirm>
        </View>
      </View>
    </Box>
  );
};

export const StatisticBox = memo(BoxContent);
