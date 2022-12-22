import AsyncComponent from 'components/AsyncComponent';
import Button from 'components/Button';
import Box from 'components/FieldBox';
import ImageTextCard from 'components/ImageTextCard';
import {
  ModalCreateArticle,
  ModalCreateCollection,
  ModalCreateNormalPage,
  ModalCreateProduct,
  useChangeModalAdminSettings,
} from 'containers/Admin/Modals';
import { useGetTemplatesPage } from 'containers/Admin/PageBuilder/TemplatesPage';
import { modalsSelector } from 'containers/Admin/selector';
import { isEmpty } from 'ramda';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BE_PageProduct } from 'services/PageService/VedaApplication/types';
import { pageBuilderSelector } from 'store/selectors';
import { i18n } from 'translation';
import { GridSmart, Space, View } from 'wiloke-react-core';
import * as styles from './styles';

const QuickCreate = () => {
  const {
    allTemplates: { data, getStatus },
  } = useSelector(pageBuilderSelector.templates);
  const { createArticle, createCollection, createProduct, createNormalPage } = useSelector(modalsSelector);

  const getTemplates = useGetTemplatesPage();
  const changeModalAdminSettings = useChangeModalAdminSettings();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState<BE_PageProduct | undefined>(undefined);

  useEffect(() => {
    getTemplates.request({ pageType: 'all', limit: 20, tabKey: 'all' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (page: BE_PageProduct) => () => {
    setCurrentPage(page);
    if (page.type === 'article') {
      changeModalAdminSettings({ createArticle: true });
    } else if (page.type === 'product') {
      changeModalAdminSettings({ createProduct: true });
    } else if (page.type === 'collection') {
      changeModalAdminSettings({ createCollection: true });
    } else {
      changeModalAdminSettings({ createNormalPage: true });
    }
  };

  const handleCancel = () => {
    setCurrentPage(undefined);
  };

  const renderLoading = (
    <GridSmart columnWidth={250} columnGap={20} columnCount={3}>
      {[0, 1, 2, 3].map(item => (
        <ImageTextCard.Loading key={item} height={350} />
      ))}
    </GridSmart>
  );

  const renderSuccess = () => {
    return (
      <View css={{ textAlign: 'center' }}>
        <GridSmart columnWidth={250} columnGap={20} columnCount={5}>
          {data.slice(0, 6).map(page => {
            const { label, image, commandId, type } = page;
            return (
              <ImageTextCard.Style2
                key={commandId}
                label={type || ''}
                description={label}
                src={image ? image.src : ''}
                widthImage={image ? image.width : 0}
                heightImage={image ? image.height : 0}
                onAdd={openModal(page)}
                disabledIconSave
              />
            );
          })}
        </GridSmart>
        <Space size={15} />
        <Button
          size="small"
          radius={4}
          onClick={() => {
            history.push('/page/templates');
          }}
        >
          {i18n.t('general.discover_more')}
        </Button>
      </View>
    );
  };

  return (
    <Box.WithTitle
      title={i18n.t('adminDashboard.featured_layouts')}
      description={i18n.t('adminDashboard.page_description.quick_create')}
      backgroundColor="light"
      borderWidth={0}
      css={styles.content}
    >
      <AsyncComponent status={getStatus} Request={renderLoading} isEmpty={isEmpty(data)} Success={renderSuccess()} />

      {currentPage && createNormalPage && (
        <ModalCreateNormalPage forceActiveDrawer={true} pageInput={currentPage as any} pageType={currentPage.type} onCancel={handleCancel} />
      )}
      {currentPage && currentPage.type === 'article' && createArticle && (
        <ModalCreateArticle forceActiveDrawer={true} pageInput={currentPage as any} onCancel={handleCancel} />
      )}
      {currentPage && currentPage.type === 'collection' && createCollection && (
        <ModalCreateCollection forceActiveDrawer={true} pageInput={currentPage as any} onCancel={handleCancel} />
      )}
      {currentPage && currentPage.type === 'product' && createProduct && (
        <ModalCreateProduct forceActiveDrawer={true} pageInput={currentPage as any} onCancel={handleCancel} />
      )}
    </Box.WithTitle>
  );
};

export default QuickCreate;
