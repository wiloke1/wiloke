import { BuilderPageFilterTab } from 'containers/Admin/PageBuilder/BuilderPageFilterTab';
import { blankPageSelector } from 'containers/Admin/selector';
import { useSelector } from 'react-redux';
import { useFilterPageType } from '../../actions';

export const SelectType = () => {
  const setFilterType = useFilterPageType();
  const { filterType } = useSelector(blankPageSelector);

  return (
    <BuilderPageFilterTab
      value={filterType}
      onChange={val => {
        setFilterType(val);
      }}
    />
  );
};
