import HeaderDrawer from 'components/HeaderDrawer';
import SimpleTabs from 'components/SimpleTabs';
import { FC } from 'react';
import { View } from 'wiloke-react-core';
import { i18n } from 'translation';
import IconUIFieldButton from './IconUIFieldButton';
import { FontIconField } from './FontIconField';
import { IconUIFieldProps, IconValue } from './types';
import { isImage, Upload } from './Upload';

type IconUIFieldFC = FC<IconUIFieldProps> & {
  Button: typeof IconUIFieldButton;
};

const IconUIField: IconUIFieldFC = ({ label = 'Icons', value = '<i class="fal fa-atom" />' as IconValue, onChange, onImageClick, goBack, css }) => {
  return (
    <View css={[{ height: '100%' }, css]} backgroundColor="gray2">
      <HeaderDrawer title={label} goBack={goBack} />
      <SimpleTabs
        defaultValue={isImage(value) ? 'image' : 'icon'}
        data={[
          { label: i18n.t('general.icon_font'), value: 'icon' },
          { label: i18n.t('general.image'), value: 'image' },
        ]}
        containerCss={{ height: 'calc(100% - 54px)' }}
        tabCss={({ colors }) => ({ backgroundColor: colors.light, height: '42px' })}
        tabItemCss={() => ({ width: '50%', textAlign: 'center' })}
      >
        {active => (
          <>
            {active === 'icon' && <FontIconField value={value} onChange={onChange} goBack={goBack} css={css} />}
            {active === 'image' && <Upload value={value} onChange={onChange} onImageClick={onImageClick} />}
          </>
        )}
      </SimpleTabs>
    </View>
  );
};

IconUIField.Button = IconUIFieldButton;

export default IconUIField;
