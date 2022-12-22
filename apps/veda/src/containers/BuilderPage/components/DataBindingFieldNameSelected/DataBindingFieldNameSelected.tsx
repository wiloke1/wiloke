import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { dataBindingFieldNamesSelector } from 'store/global/dataBindingFieldNames/slice';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';

export interface DataBindingFieldNameSelectedProps {
  fieldName: string;
}

export const DataBindingFieldNameSelected: FC<DataBindingFieldNameSelectedProps> = ({ fieldName }) => {
  const dataBindingFieldNames = useSelector(dataBindingFieldNamesSelector);

  if (!dataBindingFieldNames.includes(fieldName)) {
    return null;
  }

  return (
    <Tooltip portal placement="right" text={i18n.t('general.data_binding_field_changed')} css={{ marginLeft: '5px' }}>
      <View
        borderWidth={1}
        borderColor="secondary"
        borderStyle="solid"
        css={{
          width: '11px',
          height: '11px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View backgroundColor="secondary" css={{ width: '5px', height: '5px', borderRadius: '50%' }} />
      </View>
    </Tooltip>
  );
};
