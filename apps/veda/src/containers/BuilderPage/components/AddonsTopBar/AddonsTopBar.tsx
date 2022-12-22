import Button from 'components/Button';
import { addonsPositionStartSelector, useSetAddonsPositionStart } from 'containers/BuilderPage/store/addonPosition/slice';
import { useSetAddonTopBarMounted } from 'containers/BuilderPage/store/addonsTopbarMounted/slice';
import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useSetSections } from 'store/actions/actionPages';
import { useAddMultiAddons } from 'store/global/themeAddons';
import { pageSectionsSelector, sectionIdActiveSelector, themeAddonsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import * as styles from './styles';

const AddonsTopBar: FC = () => {
  const sectionIdActive = useSelector(sectionIdActiveSelector);
  const pageSections = useSelector(pageSectionsSelector);
  const addonsPositionStart = useSelector(addonsPositionStartSelector);
  const themeAddons = useSelector(themeAddonsSelector);
  const themeAddonsActive = themeAddons.data.find(item => item.sectionId === sectionIdActive);
  const setAddonsPositionStart = useSetAddonsPositionStart();
  const prevPageSections = useRef(pageSections);
  const prevThemeAddons = useRef(themeAddons);
  const setSections = useSetSections();
  const addMultiAddons = useAddMultiAddons();
  const setAddonTopBarMounted = useSetAddonTopBarMounted();

  useEffect(() => {
    setAddonTopBarMounted(true);
    return () => {
      setAddonTopBarMounted(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: @wiloke1
  // Cân xoá đoạn này đi nếu đồng ý cho addons đc add nhiều vị trí
  useEffect(() => {
    if (addonsPositionStart.value && themeAddonsActive?.sectionId) {
      // Thử xoá đi để add nhiêu vị trí
      // removeAddonsInSection(themeAddonsActive.sectionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    // pmParent.emit('@rerender', { sectionId: addonsPositionStart.targetSectionId, action: 'AddonsTopBar.tsx' });
    setAddonsPositionStart({ value: false });
    // Nếu cancel thì reset lại sections và addons về lúc trước khi chỉnh position
    setSections(prevPageSections.current);
    addMultiAddons({ addons: prevThemeAddons.current.data });
  };

  const handleSave = () => {
    setAddonsPositionStart({ value: false });
  };

  return (
    <View css={styles.container}>
      <View tagName="h5" color="gray2">
        {i18n.t('general.addon_pick_position')}
      </View>
      <View css={styles.right}>
        <View css={{ marginRight: '10px' }}>
          <Button
            backgroundColor="gray7"
            color="gray2"
            size="extra-small"
            radius={4}
            fontFamily="secondary"
            css={{ fontWeight: 500, height: '36px', paddingTop: '8px', paddingBottom: '8px' }}
            onClick={handleCancel}
          >
            {i18n.t('general.cancel')}
          </Button>
        </View>
        <View>
          <Button
            backgroundColor="primary"
            size="extra-small"
            radius={4}
            fontFamily="secondary"
            css={{ fontWeight: 500, height: '36px', paddingTop: '8px', paddingBottom: '8px' }}
            onClick={handleSave}
          >
            {i18n.t('general.save_changes')}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AddonsTopBar;
