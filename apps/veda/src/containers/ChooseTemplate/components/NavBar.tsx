import InlineMenu from 'components/InlineMenu';
import NavItemSetting from 'components/NavItemSetting';
import TextInput from 'components/TextInput';
import elasticlunr from 'elasticlunr';
import { debounce, isEmpty } from 'lodash';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useGuarded from 'routes/useGuarded';
import { SectionCategoryForFrontend } from 'services/SectionService/types';
import { addonSelector, chooseTemplateVisibleSelector, sectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { Divider, FontAwesomeBrandsName, FontAwesomeName, FontAwesomeType, View } from 'wiloke-react-core';
import { useChangeMySectionCategory, useSetTemplateBoardVisible } from '../store/actions';
import { useSetUserAddonsCategory } from '../store/reducers/addons/user.sliceAddonCategory';
import { useSetUserCategorySection } from '../store/reducers/sections/user.reducerCategory';
import * as styles from '../styles';

type NavLib = 'sections' | 'my_sections' | 'addons' | 'draft' | 'import' | 'admin';

export interface SettingNav<T> {
  label: string;
  description?: string;
  value: T;
  icon?: FontAwesomeName | FontAwesomeBrandsName;
  iconType?: FontAwesomeType;
}

const elasticlunrIndex = elasticlunr<SectionCategoryForFrontend>(function() {
  this.addField('title');
  this.addField('slug');
  this.setRef('commandId');
});

const navs: SettingNav<NavLib>[] = [
  {
    value: 'sections',
    label: 'Sections',
    icon: 'ballot' as FontAwesomeName,
  },
  {
    label: 'Add-ons',
    value: 'addons',
    icon: 'puzzle-piece',
    iconType: 'fal',
  },
  {
    value: 'my_sections',
    label: 'Saved',
    icon: 'id-badge',
  },
  {
    value: 'import',
    label: 'Import',
    icon: 'file-import',
  },
];

export const LibraryNav = () => {
  const { categories, getStatus, categoryId } = useSelector(sectionsSelector.categories);
  const { categorySlug: mySectionCategorySlug, categories: myCategories } = useSelector(sectionsSelector.savedSections);
  const { addonsNav, navAddonsId, getNavStatus } = useSelector(addonSelector.userAddonsCategory);
  const { navKeys } = useSelector(chooseTemplateVisibleSelector);
  const guard = useGuarded();
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState('');
  const [categoriesState, setCategoriesState] = useState<SectionCategoryForFrontend[]>(categories);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const changeNavKeys = useSetTemplateBoardVisible();
  const changeCategory = useSetUserCategorySection();
  const changeMySectionCategory = useChangeMySectionCategory();
  const changeNavAddon = useSetUserAddonsCategory();

  const handleChangeCategoryDebounced = debounce((category: SectionCategoryForFrontend) => {
    changeCategory({
      categoryId: category.commandId,
      categorySlug: category.slug,
    });
  }, 400);

  useEffect(() => {
    categories.forEach(item => {
      elasticlunrIndex.addDoc(item);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (focused) {
      const result = elasticlunrIndex.search(search, { expand: true }).map(({ ref }) => {
        return elasticlunrIndex.documentStore.getDoc(ref);
      });
      setCategoriesState(isEmpty(result) ? categories : result);
      if (!isEmpty(result) && result[0]) {
        handleChangeCategoryDebounced(result[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, categories, focused]);

  const handleChangeMenuKey = (keys: string[]) => {
    changeNavKeys({
      navKeys: keys,
    });
  };

  const renderSearch = () => {
    return (
      <View ref={searchRef} css={({ colors }) => ({ padding: '10px', borderBottom: `1px solid ${colors.gray2}` })}>
        <TextInput
          block
          sizeInput="small"
          placeholder={i18n.t('builderPage.search', { textTransform: 'capitalize', text: i18n.t('general.sections') })}
          onValueChange={value => {
            setSearch(value);
            setFocused(true);
          }}
        />
      </View>
    );
  };

  const renderUserSectionNav = (item: SectionCategoryForFrontend) => {
    const { commandId, title, slug, quantity } = item;

    return (
      <InlineMenu.Item width={238} key={commandId} itemId={commandId}>
        {!guard('admin', 'dev') && slug.toLowerCase().includes('mega') ? (
          <NavItemSetting.Style2 title="" />
        ) : (
          <NavItemSetting.Style2
            onClick={() => {
              changeCategory({
                categoryId: commandId,
                categorySlug: slug,
                sectionQuantityOfCategory: Number(quantity),
              });
            }}
            active={commandId === categoryId}
            title={title}
            badge={quantity}
          />
        )}
        <Divider size={1} color="gray2" />
      </InlineMenu.Item>
    );
  };

  const renderSavedNav = (item: SectionCategoryForFrontend) => {
    const { commandId, title, slug } = item;

    return (
      <InlineMenu.Item width={238} key={commandId} itemId={commandId}>
        <NavItemSetting.Style2
          onClick={() => {
            changeMySectionCategory({ categorySlug: slug });
          }}
          active={slug === mySectionCategorySlug}
          title={title}
        />
        <Divider size={1} color="gray2" />
      </InlineMenu.Item>
    );
  };

  const renderUserAddonsNav = (item: SectionCategoryForFrontend) => {
    const { commandId, slug, quantity } = item;
    return (
      <InlineMenu.Item width={238} key={commandId} itemId={commandId}>
        <NavItemSetting.Style2
          onClick={() => {
            changeNavAddon({
              id: commandId,
              slug: slug,
              addonQuantityOfCategory: Number(quantity),
            });
          }}
          active={commandId === navAddonsId}
          title={slug}
          badge={quantity}
        />
        <Divider size={1} color="gray2" />
      </InlineMenu.Item>
    );
  };

  const renderDraftSectionNav = (item: string) => {
    return (
      <InlineMenu.Item width={238} key={item} itemId={item}>
        <NavItemSetting.Style2 title={item} active={navKeys.includes(item)} />
        <Divider size={1} color="gray2" />
      </InlineMenu.Item>
    );
  };

  const renderAdminSectionNav = (item: string) => {
    return (
      <InlineMenu.Item width={238} key={item} itemId={item}>
        <NavItemSetting.Style2 title={item} active={navKeys.includes(item)} />
        <Divider size={1} color="gray2" />
      </InlineMenu.Item>
    );
  };

  const renderSkeletonNav = [1, 2, 3, 4].map(item => (
    <InlineMenu.Item disabledClick={true} width={238} key={item} itemId={item.toString()}>
      <View width={238} height={35} backgroundColor="gray1" key={item} css={styles.skeletonNav}>
        <View backgroundColor="gray3" height={8} width={100} radius={3} />
      </View>
      <Divider size={1} color="gray2" />
    </InlineMenu.Item>
  ));

  const mappingNav: Record<NavLib, () => ReactNode> = {
    // users
    sections: () => (getStatus === 'loading' ? renderSkeletonNav : categoriesState.map(renderUserSectionNav)),
    addons: () => (getNavStatus === 'loading' ? renderSkeletonNav : addonsNav.map(renderUserAddonsNav)),

    // general
    my_sections: () => (myCategories.length === 0 ? renderSkeletonNav : myCategories.map(renderSavedNav)),
    import: () => <></>,

    // dev
    draft: () => ['Sections', 'Addons', 'Mega-menu'].map(renderDraftSectionNav),

    // admin
    admin: () => ['Sections', 'Addons', 'Mega-menu', 'Atom Categories', 'Product Categories'].map(renderAdminSectionNav),
  };

  return (
    <InlineMenu defaultItemIds={navKeys} onChange={handleChangeMenuKey} width={navKeys[0] === 'import' ? 81 : 320} disabledScroll>
      {(guard('admin', 'dev')
        ? ([
            ...navs,
            {
              value: 'admin',
              label: 'Admin',
              icon: 'user-shield',
            },
            {
              value: 'draft',
              label: 'Dev',
              icon: 'user-tie',
            },
          ] as SettingNav<NavLib>[])
        : navs
      ).map(nav => (
        <InlineMenu.SubMenu
          key={nav.value}
          itemId={nav.value}
          titleWidth={80}
          width={nav.value === 'import' ? 0 : 240}
          title={<NavItemSetting.Style3 title={nav.label} iconName={nav.icon} active={navKeys.includes(nav.value)} />}
          Header={['sections'].includes(nav.value) && renderSearch()}
        >
          {mappingNav[nav.value]()}
        </InlineMenu.SubMenu>
      ))}
    </InlineMenu>
  );
};
