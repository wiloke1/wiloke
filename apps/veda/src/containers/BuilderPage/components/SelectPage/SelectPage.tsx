import Tooltip from 'components/Tooltip';
import { useSetSelectPage } from 'containers/BuilderPage/store/selectPage/slice';
import { useSetTwigLoading } from 'containers/BuilderPage/store/twigLoading/slice';
import useOuterClick from 'hooks/useOuterClick';
import { FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Location } from 'react-router';
import { useHistory } from 'react-router-dom';
import { LocationStates } from 'routes/LocationStates';
import { pagesSelector } from 'store/selectors';
import { i18n } from 'translation';
import { Page } from 'types/Page';
import { createPortal } from 'utils/functions/createPortal';
import getPageInfo from 'utils/functions/getInfo';
import offset from 'utils/functions/offset';
import { getEntityVariant } from 'utils/getEntityVariant';
import { FontAwesome, Space, Text, View } from 'wiloke-react-core';
import * as styles from './styles';

const SelectPage: FC = () => {
  const pages = useSelector(pagesSelector);
  const dropdownData = Object.values(pages.data).map(item => ({ label: item.label, value: item.commandId }));
  const history = useHistory<'/builder'>();
  const [visible, setVisible] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const buttonRef = useRef<HTMLElement | null>(null);
  const pagesData = Object.values(pages.data);
  const setSelectPage = useSetSelectPage();
  const setTwigLoading = useSetTwigLoading();

  const handleChangePage = (page: Page) => async () => {
    setVisible(false);
    if (page.commandId !== getPageInfo('id')) {
      const entityVariant = getEntityVariant((history.location as unknown) as Location<keyof LocationStates>);
      history.push(
        `/builder?shop=${getPageInfo('shop')}&id=${page.commandId}&themeId=${getPageInfo('themeId')}&entityVariant=${entityVariant}`,
        history.location.state,
      );
      setSelectPage(true);
      setTwigLoading(true);
    }
  };

  useOuterClick(buttonRef.current, () => {
    setVisible(false);
  });

  if (!dropdownData.length || !getPageInfo('themeId')) {
    return null;
  }

  const renderDropdown = (
    <View css={styles.dropdown(top, left)}>
      {pagesData.map(page => {
        if (!page.label) {
          return null;
        }

        return (
          <View key={page.commandId} css={styles.dropdownItem(page.commandId === getPageInfo('id'))} onClick={handleChangePage(page)}>
            <Text numberOfLines={1}>{page.label}</Text>
            {!!page.sections.length && (
              <Tooltip
                portal
                placement="right"
                text={`${i18n.t('general.page', { text: i18n.t('builderPage.loaded') })}`}
                css={{ padding: '3px', marginRight: '-3px' }}
              >
                <View backgroundColor="secondary" radius="pill" css={{ width: '6px', height: '6px' }} />
              </Tooltip>
            )}
          </View>
        );
      })}
    </View>
  );

  const handleButtonClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const el = event.currentTarget as HTMLElement;
    setVisible(state => !state);
    setTop(offset(el).top + el.offsetHeight);
    setLeft(offset(el).left);
  };

  return (
    <>
      <View css={styles.container}>
        {visible && createPortal(renderDropdown)}
        <View ref={buttonRef} css={styles.button(visible)} onClick={handleButtonClick}>
          <Text numberOfLines={1}>{pages.data[getPageInfo('id')].label}</Text>
          <FontAwesome type="far" name="angle-down" size={18} />
        </View>
      </View>
      <Space size={10} type="horizontal" />
    </>
  );
};

export default SelectPage;
