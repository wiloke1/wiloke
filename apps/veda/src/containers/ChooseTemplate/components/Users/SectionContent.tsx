import AsyncComponent from 'components/AsyncComponent';
import ImageTextCard from 'components/ImageTextCard';
import Masonry from 'components/Masonry';
import { VedaLoadingItem } from 'components/VedaLoadingItem';
import configureApp from 'configureApp';
import { useDeleteProductSection, useGetSection, useGetSections, useLoadMoreSections, useSaveSection } from 'containers/ChooseTemplate/store/actions';
import { range } from 'ramda';
import { FC, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { authSelector, chooseTemplateVisibleSelector, pageDataSelector, sectionIdActiveSelector, sectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { ProductSection } from 'types/Sections';
import { imageUrl } from 'utils/functions/imageUrl';
import { GridSmart, Space, View, ViewportTracking } from 'wiloke-react-core';

const Content: FC = () => {
  const { getStatus: getCategoryStatus, categoryId, categorySlug, sectionQuantiryOfCategory } = useSelector(sectionsSelector.categories);
  const { sections, getAllStatus, sectionIdLoading, loadMoreStatus, deleteStatus, savedStatus, hasNextPage } = useSelector(
    sectionsSelector.userSections,
  );

  const sectionIdActive = useSelector(sectionIdActiveSelector);

  const { role } = useSelector(authSelector);
  const chooseTemplateVisible = useSelector(chooseTemplateVisibleSelector);
  const page = useSelector(pageDataSelector);

  const getSection = useGetSection();
  const getSections = useGetSections();
  const deleteSection = useDeleteProductSection();
  const saveToFavorite = useSaveSection();
  const loadMoreSections = useLoadMoreSections();

  useEffect(() => {
    if (getCategoryStatus === 'success' && chooseTemplateVisible.navKeys[0] === 'sections') {
      getSections.request({
        sectionIdActive,
        categoryName: categorySlug,
        limit: 20,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategoryStatus, sectionIdActive, categorySlug, chooseTemplateVisible.navKeys[0]]);

  const renderLoadingHeader = range(0, sectionQuantiryOfCategory).map(i => (
    <View key={i}>
      <ImageTextCard.Loading aspectRatio={20} />
      <Space size={10} />
    </View>
  ));

  const renderLoading = (
    <GridSmart columnWidth={200} columnCount={3} columnGap={10}>
      {range(0, sectionQuantiryOfCategory).map(i => (
        <ImageTextCard.Loading key={i} />
      ))}
    </GridSmart>
  );

  const TrackingLoadMore = useMemo(() => {
    const cursor = sections.at(-1)?.commandId;
    if (cursor && hasNextPage) {
      return (
        <ViewportTracking
          offsetTop={-200}
          onEnterViewport={() => {
            if (loadMoreStatus !== 'loading') {
              loadMoreSections.request({ lastCursor: cursor });
            }
          }}
        >
          <View css={{ padding: '30px 10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <VedaLoadingItem />
          </View>
        </ViewportTracking>
      );
    }

    return null;
  }, [hasNextPage, loadMoreSections, loadMoreStatus, sections]);

  const renderSuccess = () => {
    return (
      <View css={{ height: '100%' }}>
        <Masonry defaultColumn={3} gap={10}>
          {sections.map(item => (
            <ImageTextCard
              onSave={() => {
                saveToFavorite.request({
                  id: item.parentCommandId,
                  categories: item.category?.name ? [item.category.name] : [],
                  name: item.label,
                  image: item.image ?? { src: '', width: 0, height: 0 },
                });
              }}
              key={item.commandId}
              label={item.label}
              loading={
                item.parentCommandId === sectionIdLoading || deleteStatus[item.commandId] === 'loading' || savedStatus[item.commandId] === 'loading'
              }
              previewImg={item.image?.src ? imageUrl(item.image?.src, 10) : ''}
              src={item.image ? imageUrl(item.image.src, 300) : undefined}
              backgroundSize="contain"
              placeholderAspectRatio={16 / 9}
              buttonText={i18n.t('general.install')}
              disabled={(item as ProductSection).pageTypes ? !(item as ProductSection).pageTypes.includes(page.type) : false}
              disableText={i18n.t('builderPage.choose_template.cannot_use_section', { type: page.type, textTransform: 'uppercase' })}
              onAdd={() => {
                getSection.request({
                  sectionId: item.parentCommandId,
                  categoryId: categoryId,
                });
              }}
              onDelete={
                role !== 'admin'
                  ? undefined
                  : () => {
                      deleteSection.request({ commandId: item.commandId });
                    }
              }
            />
          ))}
        </Masonry>
        {TrackingLoadMore}
      </View>
    );
  };

  const renderSectionsHeader = () => {
    return (
      <View css={{ height: '100%' }}>
        {sections.map(item => (
          <ImageTextCard
            containerCss={{ marginBottom: '8px' }}
            key={item.id}
            label={item.label}
            loading={
              item.parentCommandId === sectionIdLoading || deleteStatus[item.commandId] === 'loading' || savedStatus[item.commandId] === 'loading'
            }
            src={item.image ? imageUrl(item.image.src, 300) : undefined}
            placeholderAspectRatio={10 / 2}
            widthImage={item.image?.width}
            heightImage={item.image?.height}
            buttonText={i18n.t('general.install')}
            disabled={
              role === 'user' ? ((item as ProductSection).pageTypes ? !(item as ProductSection).pageTypes.includes(page.type) : false) : false
            }
            onSave={() => {
              saveToFavorite.request({
                id: item.parentCommandId,
                categories: item.category?.name ? [item.category.name] : [],
                name: item.label,
                image: item.image ?? { src: '', width: 0, height: 0 },
              });
            }}
            disableText={i18n.t('builderPage.choose_template.cannot_use_section', { type: page.type, textTransform: 'uppercase' })}
            onAdd={() => {
              getSection.request({
                sectionId: item.parentCommandId,
                categoryId: categoryId,
              });
            }}
            onDelete={
              role !== 'admin'
                ? undefined
                : () => {
                    deleteSection.request({ commandId: item.commandId });
                  }
            }
          />
        ))}
        {TrackingLoadMore}
      </View>
    );
  };

  return (
    <View css={{ padding: '10px', height: '100%' }}>
      <AsyncComponent
        isEmpty={configureApp.env === 'prod' ? sections.length === 0 : false}
        Request={categorySlug.includes('header') || categorySlug.includes('Header') ? renderLoadingHeader : renderLoading}
        status={getAllStatus}
        Success={categorySlug.includes('header') || categorySlug.includes('Header') ? renderSectionsHeader() : renderSuccess()}
      />
    </View>
  );
};

export default Content;
