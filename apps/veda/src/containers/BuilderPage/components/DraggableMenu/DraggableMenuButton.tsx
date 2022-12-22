import Box from 'components/FieldBox';
import { FC } from 'react';
import { FontAwesome, Text, View } from 'wiloke-react-core';
import { i18n } from 'translation';
import xss from 'xss';
import { DraggableMenuButtonProps } from './types';
import * as styles from './styles';

export const DraggableMenuButton: FC<DraggableMenuButtonProps> = ({ settings, css, onClick }) => {
  const getDescription = () => {
    if (Array.isArray(settings) && settings.length > 0) {
      const { iconEnabled, icon, label, href } = settings[0];
      const desc = `${icon}, ${label}, ${href}, ${iconEnabled}`;
      if (desc.length > 20) {
        return `${desc.slice(0, 55)}..., `;
      }
      return `${desc} ,`;
    } else {
      return '';
    }
  };

  return (
    <Box borderColor="gray3" css={[styles.buttonContainer, css]}>
      <View>
        <Text tagName="h6">{i18n.t('builderPage.mega_menu.navigation')}</Text>
        <Text css={{ '> *': { display: 'inline' } }} size={10} numberOfLines={1} dangerouslySetInnerHTML={{ __html: xss(getDescription()) }} />
      </View>
      <View css={styles.buttonIcon} backgroundColorHover="gray3" backgroundColor="gray2" onClick={onClick}>
        <FontAwesome type="far" size={16} name="angle-right" />
      </View>
    </Box>
  );
};
