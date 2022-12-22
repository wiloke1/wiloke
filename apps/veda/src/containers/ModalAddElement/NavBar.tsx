import AsyncComponent from 'components/AsyncComponent';
import MenuItem from 'components/MenuItem';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { sectionsSelector } from 'store/selectors';
import { Divider, View } from 'wiloke-react-core';

const NavBar: FC = () => {
  const { getStatus, categories, categoryId } = useSelector(sectionsSelector.categories);

  return (
    <AsyncComponent
      status={getStatus}
      Success={categories.map(item => (
        <View key={item.commandId}>
          <MenuItem
            active={item.commandId === categoryId}
            label={item.title}
            onClick={() => {
              // getSections.request({ category: item.slug, categoryId: item.id, sectionIdActive });
            }}
            badge={item.quantity}
          />
          <Divider size={1} color="gray2" />
        </View>
      ))}
    />
  );
};

export default NavBar;
