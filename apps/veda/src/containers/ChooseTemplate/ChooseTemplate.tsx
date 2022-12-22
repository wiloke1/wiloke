import MyModal from 'components/MyModal';
import ScrollBars from 'components/ScrollBars';
import TextInput from 'components/TextInput';
import { useSetTemplateBoardVisible } from 'containers/ChooseTemplate/store/actions';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useSetSectionEdittingId } from 'store/global/sectionEdittingId/actions';
import { chooseTemplateVisibleSelector, sectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { View } from 'wiloke-react-core';
import { AdminAddonTemplate } from './components/Admin/AdminAddonTemplate';
import { AdminCategories } from './components/Admin/AdminCategories';
import { AdminMegaMenu } from './components/Admin/AdminMegaMenu';
import AdminSectionTemplate from './components/Admin/AdminSectionTemplate';
import { ProductCategories } from './components/Admin/ProductCategories';
import { DraftAddonTemplate } from './components/Draft/DraftAddonTemplate';
import { DraftMegaMenu } from './components/Draft/DraftMegaMenu';
import DraftSectionTemplate from './components/Draft/DraftSectionTemplate';
import { ImportSectionContent } from './components/ImportSectionContent';
import { LibraryNav } from './components/NavBar';
import { AddonsContent } from './components/Users/AddonsContent';
import { SavedContent } from './components/Users/SavedContent';
import SectionContent from './components/Users/SectionContent';
import { useOpenModalEditCategory } from './store/reducers/sections/user.sliceSections';
import * as styles from './styles';

const ChooseTemplate: FC = () => {
  const { navKeys, visible } = useSelector(chooseTemplateVisibleSelector);
  const sectionState = useSelector(sectionsSelector.userSections);
  const { categorySlug } = useSelector(sectionsSelector.categories);

  const openModalEditCategory = useOpenModalEditCategory();
  const setSectionEditing = useSetSectionEdittingId();
  const setTemplateBoardVisible = useSetTemplateBoardVisible();
  const renderNav = <LibraryNav />;

  const renderContent = (
    <ScrollBars css={styles.right}>
      {navKeys[0] === 'sections' && <SectionContent />}
      {navKeys[0] === 'addons' && <AddonsContent />}

      {navKeys[0] === 'import' && <ImportSectionContent />}
      {navKeys[0] === 'my_sections' && <SavedContent />}

      {/* dev zone */}
      {navKeys[0] === 'draft' && navKeys[1] === 'Sections' && <DraftSectionTemplate />}
      {navKeys[0] === 'draft' && navKeys[1] === 'Addons' && <DraftAddonTemplate />}
      {navKeys[0] === 'draft' && navKeys[1] === 'Mega-menu' && <DraftMegaMenu />}

      {/* admin zone */}
      {navKeys[0] === 'admin' && navKeys[1] === 'Sections' && <AdminSectionTemplate />}
      {navKeys[0] === 'admin' && navKeys[1] === 'Addons' && <AdminAddonTemplate />}
      {navKeys[0] === 'admin' && navKeys[1] === 'Mega-menu' && <AdminMegaMenu />}
      {navKeys[0] === 'admin' && navKeys[1] === 'Atom Categories' && <AdminCategories />}
      {navKeys[0] === 'admin' && navKeys[1] === 'Product Categories' && <ProductCategories />}
    </ScrollBars>
  );

  return (
    <MyModal
      size="large"
      scrollDisabled
      isVisible={visible}
      headerText={`List ${i18n.t('general.sections')}`}
      contentCss={{ padding: 0 }}
      cancelText=""
      okText=""
      onCancel={() => {
        setTemplateBoardVisible({ visible: false });
        setSectionEditing('');
      }}
    >
      <View css={styles.inner}>
        {renderNav}
        {renderContent}
      </View>

      <MyModal
        isVisible={sectionState.visibleEditCategory}
        onCancel={() => {
          openModalEditCategory(false);
        }}
      >
        <TextInput value={categorySlug} block />
      </MyModal>
    </MyModal>
  );
};

export default ChooseTemplate;
