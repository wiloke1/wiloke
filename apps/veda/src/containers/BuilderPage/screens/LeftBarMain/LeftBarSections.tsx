import Button from 'components/Button';
import DragItem from 'components/DragItem';
import ScrollBars from 'components/ScrollBars';
import Sortable, { RenderItemParam, SortableProps } from 'components/Sortable';
import { useStackNavigator } from 'components/StackNavigator';
import Tooltip from 'components/Tooltip';
import { LeftBarParamList } from 'containers/BuilderPage/components/SidebarScreen/SidebarScreen';
import UpdateVersion from 'containers/BuilderPage/components/UpdateVersion/UpdateVersion';
import { useSetTemplateBoardVisible } from 'containers/ChooseTemplate/store/actions/actionTemplateBoardVisible';
import setScrollTo from 'containers/IframePage/setScrollTo';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSortableSection } from 'store/actions/actionPages';
import { useSetSectionIdActive } from 'store/actions/actionSectionIdActive';
import { useSetIsDragging } from 'store/global/isDragging/slice';
import { sectionIdHoverSelector, useSetSectionIdHover } from 'store/global/sectionIdHover/slice';
import { chooseTemplateVisibleSelector, isDraggingSelector, pageSectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { PageSection, ProductSection } from 'types/Sections';
import { isFooter, isHeader, isSectionAddons, isSectionAddonsOrMegamenu, isSectionMegamenu } from 'utils/functions/checkSectionType';
import delay from 'utils/functions/delay';
import { pmParent } from 'utils/functions/postMessage';
import { Text, View } from 'wiloke-react-core';
import SectionDropDown from '../../components/SectionDropDown/SectionDropDown';
import SectionShowHide from '../../components/SectionShowHide/SectionShowHide';
import { ClearAllButton } from './ClearAllButton';
import * as styles from './styles';

type ContentType = 'header' | 'main' | 'footer';

const MIN_ORDER = 1000;

const LeftBarSections: FC = () => {
  const pageSections = useSelector(pageSectionsSelector);
  const sortableSection = useSortableSection();
  const setSectionIdActive = useSetSectionIdActive();
  const setIsDragging = useSetIsDragging();
  const setTemplateBoardVisible = useSetTemplateBoardVisible();
  // const [sectionIdHover, setSectionIdHover] = useState('');
  // const pmParentOff = useRef<PostMessageOff | undefined>();
  const navigation = useStackNavigator<LeftBarParamList>();
  // const main = pageSections.filter(section => !isSectionAddons(section.type) && !isHeader(section.type) && !isFooter(section.type));
  const main = pageSections.filter(section => !isSectionAddonsOrMegamenu(section.type) && !isHeader(section.type) && !isFooter(section.type));
  const header = pageSections.filter(section => isHeader(section.type));
  const footer = pageSections.filter(section => isFooter(section.type));
  const setSectionIdHover = useSetSectionIdHover();
  const sectionIdHover = useSelector(sectionIdHoverSelector);
  const { navKeys } = useSelector(chooseTemplateVisibleSelector);
  const isDragging = useSelector(isDraggingSelector);
  const iframeEl = document.querySelector<HTMLIFrameElement>('#iframe-content');

  const setSectionOrder = (type: 'set' | 'remove') => {
    pageSections.forEach((section, index) => {
      if (!(isSectionAddons(section.type) && isSectionMegamenu(section.type))) {
        const sectionEl = iframeEl?.contentDocument?.querySelector?.<HTMLElement>(`[data-id="${section.id}"]`);
        if (sectionEl) {
          if (type === 'set') {
            sectionEl.style.order = `${index * 2 + MIN_ORDER}`;
          } else {
            sectionEl.style.removeProperty('order');
          }
        }
      }
    });
  };

  useEffect(() => {
    const iframeRootEl = iframeEl?.contentDocument?.querySelector?.<HTMLElement>('#iframe-root');
    if (isDragging) {
      if (iframeRootEl) {
        iframeRootEl.style.display = 'flex';
        iframeRootEl.style.flexDirection = 'column';
      }
      setSectionOrder('set');
    } else {
      if (iframeRootEl) {
        iframeRootEl.style.removeProperty('display');
        iframeRootEl.style.removeProperty('flex-direction');
      }
      setSectionOrder('remove');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const handleChooseTemplateVisible = () => {
    setTemplateBoardVisible({
      navKeys: navKeys.length > 0 ? navKeys : ['sections'],
    });
    const index = header.length + main.length;
    setTemplateBoardVisible({ visible: true, index, isChange: false });
  };

  const getIndex = (type: ContentType, index: number) => {
    let result = index;
    if (type === 'main') {
      result = result + header.length;
    } else if (type === 'footer') {
      result = result + header.length + main.length;
    }
    return result;
  };

  const getSortableProps = (type: ContentType): Omit<SortableProps<PageSection>, 'renderItem' | 'data'> => ({
    keyExtractor: section => section.id,
    itemCss: { marginBottom: '2px' },
    onDragStart: result => {
      const sectionId = result.draggableId;
      setScrollTo(`[data-id="${sectionId}"]`);
      setIsDragging(true);
      setSectionIdHover(sectionId);
    },
    onDragUpdate: result => {
      if (!result.destination) {
        return;
      }
      const srcIndex = getIndex(type, result.source.index);
      const desIndex = getIndex(type, result.destination.index);
      const sectionId = result.draggableId;

      const sectionActiveEl = iframeEl?.contentDocument?.querySelector?.<HTMLElement>(`[data-id="${sectionId}"]`);
      if (sectionActiveEl) {
        if (srcIndex > desIndex) {
          sectionActiveEl.style.order = `${desIndex * 2 - 1 + MIN_ORDER}`;
        } else {
          sectionActiveEl.style.order = `${desIndex * 2 + 1 + MIN_ORDER}`;
        }
      }
      if (!!sectionId) {
        setScrollTo(`[data-id="${sectionId}"]`, { smooth: false });
      }
    },
    onDragEnd: async result => {
      setIsDragging(false);
      const sectionId = result.draggableId;
      if (!result.destination) {
        return;
      }
      setSectionOrder('remove');
      sortableSection(getIndex(type, result.source.index), getIndex(type, result.destination.index));
      await delay(300);
      if (!!sectionId) {
        setScrollTo(`[data-id="${sectionId}"]`);
      }
    },
  });

  const renderItem = ({ item: section, dragHandleProps, isDragging }: RenderItemParam<PageSection>) => {
    return (
      <View
        {...dragHandleProps}
        onMouseEnter={() => {
          setSectionIdHover(section.id);
        }}
        onMouseLeave={() => {
          if (!isDragging) {
            setSectionIdHover('');
          }
        }}
      >
        <DragItem
          label={section.label}
          active={sectionIdHover === section.id || isDragging}
          onEdit={() => {
            navigation.navigate('fieldSettingsScreen');
            setSectionIdActive(section.id);
            pmParent.emit('@section/sectionIdActive', section.id ?? '');
          }}
          RightItem={
            <>
              <UpdateVersion type="section" item={section as ProductSection} />
              <Tooltip portal text={i18n.t(section.enable ? 'general.hide' : 'general.show')}>
                <SectionShowHide sectionId={section.id} iconName={section.enable ? 'eye' : 'eye-slash'} />
              </Tooltip>
              <SectionDropDown sectionId={section.id} />
            </>
          }
        />
      </View>
    );
  };

  return (
    <>
      <ScrollBars css={{ height: 'calc(100% - 130px) !important' }}>
        <View css={styles.content}>
          {!!header.length && (
            <Text tagName="h6" size={11} color="gray7" css={{ marginBottom: '5px', textTransform: 'uppercase' }}>
              {i18n.t('general.header')}
            </Text>
          )}
          <View css={{ marginBottom: '15px' }}>
            <Sortable {...getSortableProps('header')} data={header} renderItem={renderItem} containerCss={{ height: '100%' }} />
          </View>
          {!!main.length && (
            <Text tagName="h6" size={11} color="gray7" css={{ marginBottom: '5px', textTransform: 'uppercase' }}>
              {i18n.t('general.main')}
            </Text>
          )}
          <View css={{ marginBottom: '15px' }}>
            <Sortable {...getSortableProps('main')} data={main} renderItem={renderItem} containerCss={{ height: '100%' }} />
          </View>
          {!!footer.length && (
            <Text tagName="h6" size={11} color="gray7" css={{ marginBottom: '5px', textTransform: 'uppercase' }}>
              {i18n.t('general.footer')}
            </Text>
          )}
          <View css={{ marginBottom: '15px' }}>
            <Sortable {...getSortableProps('footer')} data={footer} renderItem={renderItem} containerCss={{ height: '100%' }} />
          </View>
        </View>
      </ScrollBars>

      <View css={styles.footer}>
        <Button backgroundColor="primary" size="small" block radius={6} fontFamily="secondary" css={styles.btn} onClick={handleChooseTemplateVisible}>
          {i18n.t('general.add', { text: i18n.t('general.section'), textTransform: 'capitalize' })}
        </Button>
        <ClearAllButton />
      </View>
    </>
  );
};

export default LeftBarSections;
