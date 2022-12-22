import { BaseEmoji, Picker } from 'emoji-mart';
import { FC, useState } from 'react';
import { FontAwesome, OuterTrigger, View } from 'wiloke-react-core';
import * as styles from './styles';

export interface EmoijPickerWrapProps {
  onChange?: (value: string) => void;
}

const EmoijPickerWrap: FC<EmoijPickerWrapProps> = ({ children, onChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View css={styles.container}>
      {children}
      <FontAwesome type="far" css={styles.icon} name="smile" size={20} color="gray5" onClick={() => setVisible(state => !state)} />
      {visible && (
        <OuterTrigger onClick={() => setVisible(false)}>
          <Picker
            native
            onClick={(value: BaseEmoji) => {
              onChange?.(value.native);
              setVisible(false);
            }}
            i18n={{
              search: 'Search',
              notfound: 'No Emoji Found',
              categories: {
                search: 'Search Results',
                recent: 'Frequently Used',
                people: 'People & Body',
                nature: 'Animals & Nature',
                foods: 'Food & Drink',
                activity: 'Activity',
                places: 'Travel & Places',
                objects: 'Objects',
                symbols: 'Symbols',
                flags: 'Flags',
                custom: 'Custom',
              },
            }}
          />
        </OuterTrigger>
      )}
    </View>
  );
};

export default EmoijPickerWrap;
