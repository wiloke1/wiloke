import Tooltip from 'components/Tooltip';
import { twigLoadingSelector } from 'containers/BuilderPage/store/twigLoading/slice';
import { useUndoRedoForRedux } from 'hooks/useUndoRedoForRedux/useUndoRedoForRedux';
import { equals } from 'ramda';
import { FC, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useDeepCompareEffect } from 'react-use';
import { pageSectionsSelector, pageSettingsSelector, sectionIdCodeVisibleSelector, themeSettingsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { FontAwesome, View } from 'wiloke-react-core';
import { useGlobalSidebarNavigation } from '../SidebarScreen/useGlobalSidebarNavigation';
import * as styles from './styles';

const UndoRedo: FC = () => {
  // Khi bất cứ thứ gì liên quan đến settings builder thay đổi - bao gồm: Sections, Page Settings, Theme Setitngs
  const sections = useSelector(pageSectionsSelector);
  const pageSettings = useSelector(pageSettingsSelector);
  const themeSettings = useSelector(themeSettingsSelector);

  const twigLoading = useSelector(twigLoadingSelector);
  const loading = useMemo(() => twigLoading, [twigLoading]);

  const sectionIdCodeVisible = useSelector(sectionIdCodeVisibleSelector);
  const codeVisible = !!sectionIdCodeVisible;

  const { canUndo, canRedo, setCheckMark, onUndo, onRedo, onInit, onReset } = useUndoRedoForRedux();
  const navigation = useGlobalSidebarNavigation();
  const dataAtStartCodeVisible = useRef<any>();

  useDeepCompareEffect(() => {
    if (!loading && !codeVisible) {
      setCheckMark();
    }
  }, [sections, pageSettings, themeSettings]);

  useEffect(() => {
    if (codeVisible) {
      dataAtStartCodeVisible.current = { sections, pageSettings, themeSettings };
    }
    if (
      !loading &&
      !codeVisible &&
      dataAtStartCodeVisible.current &&
      !equals(dataAtStartCodeVisible.current, { sections, pageSettings, themeSettings })
    ) {
      setCheckMark();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeVisible]);

  useEffect(() => {
    onInit();
    return () => {
      onReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View css={styles.iconWrap}>
      <Tooltip
        portal
        text={i18n.t('general.undo')}
        placement="bottom"
        onClick={() => {
          if (canUndo) {
            onUndo();
            navigation.goBack(1000);
          }
        }}
        css={[styles.itemFull, { opacity: canUndo ? 1 : 0.4 }]}
      >
        <FontAwesome type="far" name="undo" size={16} color="gray7" css={styles.icon} />
      </Tooltip>
      <View css={styles.divider} />
      <Tooltip
        portal
        text={i18n.t('general.redo')}
        placement="bottom"
        onClick={() => {
          if (canRedo) {
            onRedo();
            navigation.goBack(1000);
          }
        }}
        css={[styles.itemFull, { opacity: canRedo ? 1 : 0.4 }]}
      >
        <FontAwesome type="far" name={'redo' as any} size={16} color="gray7" css={styles.icon} />
      </Tooltip>
    </View>
  );
};

export default UndoRedo;
