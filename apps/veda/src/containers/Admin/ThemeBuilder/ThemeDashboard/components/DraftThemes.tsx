import AsyncComponent from 'components/AsyncComponent';
import Button from 'components/Button';
import { Confirm } from 'components/Confirm/Confirm';
import DraftBox from 'components/DraftBox';
import Box from 'components/FieldBox';
import ImagePlaceholder from 'components/ImagePlaceholder';
import LazyImage from 'components/LazyImage';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useSetIsSavedTheme } from 'store/reducers/sliceOriginThemeSettings';
import { i18n } from 'translation';
import { ClientTheme } from 'types/Theme';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { timeConverter } from 'utils/timeAgo';

import { FontAwesome, Text, View } from 'wiloke-react-core';
import { useActiveThemeVeda, useDeleteClientTheme, useGetClientThemes, useLoadMoreClientThemes } from '../slice/actions';
import { themeDashboardSelector } from '../slice/sliceThemeDashboard';
import * as styles from './styles';

const TIME_REMOVE_COLOR = 10000;

// Todo: i18n
export const DraftThemes = () => {
  const {
    getClientThemesStatus,
    themes,
    deleteClientThemeStatus,
    hasNextPage,
    loadMoreClientThemesStatus,
    activeThemeVedaStatus,
    themeActivate,
  } = useSelector(themeDashboardSelector);
  const getClientThemes = useGetClientThemes();
  const deleteClientTheme = useDeleteClientTheme();
  const loadMoreClientThemes = useLoadMoreClientThemes();
  const activeThemeVeda = useActiveThemeVeda();

  const { shopName } = getUserInfo();
  const history = useHistory<'/theme'>();
  const location = useLocation<'/theme'>();
  const setIsSavedTheme = useSetIsSavedTheme();

  const itemRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | undefined>();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    getClientThemes.request(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (itemRef.current && getClientThemesStatus === 'success' && location.state?.justInstalled) {
      const firstElement = itemRef.current.querySelector('.DraftBox-container') as HTMLDivElement | null;
      if (firstElement) {
        firstElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        setJustAdded(true);
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
          setJustAdded(false);
        }, TIME_REMOVE_COLOR);
      }
    }

    return () => {
      window.clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getClientThemesStatus, location]);

  const handleLoadMore = () => {
    loadMoreClientThemes.request(undefined);
  };

  const customTheme = (item: ClientTheme) => () => {
    if (themeActivate.commandId !== item.commandId) {
      setIsSavedTheme(false);
    }
    const entityVariant = 'Client';
    history.push(`/builder?shop=${shopName}&id=${item.pageCommandIds[0]}&themeId=${item.commandId}&entityVariant=${entityVariant}`, {
      label: '',
      isCreate: false,
      backToPage: '/theme',
      entityVariant,
    });
  };

  const renderRightAction = (item: ClientTheme) => {
    return (
      <Confirm
        key={'confirm'}
        okText={i18n.t('general.publish')}
        bodyCss={{ width: '650px' }}
        okBackgroundColor="secondary"
        message={
          <View>
            <View css={{ marginBottom: '4px' }}>
              {i18n.t('general.confirm_publish')}{' '}
              <View tagName="span" css={{ fontWeight: 'bold' }}>
                {item.label}
              </View>
              ? This will replace your current theme{' '}
              <View tagName="span" css={{ fontWeight: 'bold' }}>
                {themeActivate.label}
              </View>
            </View>
            {item.featuredImage ? <LazyImage src={item.featuredImage} backgroundSize="contain" /> : <ImagePlaceholder aspectRatio={16 / 9} />}
          </View>
        }
        title={i18n.t('general.publish', { text: i18n.t('builderPage.draft') })}
        isLoading={activeThemeVedaStatus[item.commandId] === 'loading'}
        onOk={onCancel => {
          onCancel();
          activeThemeVeda.request({ themeId: item.commandId });
        }}
      >
        <View key={'confirm_content'} css={styles.dropdown} backgroundColor={'light'} borderWidth={1} borderStyle="solid" borderColor={'gray4'}>
          {i18n.t('general.publish')}
        </View>
      </Confirm>
    );
  };

  return (
    <Box.WithTitle
      title={`${i18n.t('adminDashboard.draft', { text: i18n.t('general.themes') })} `}
      description={i18n.t('adminDashboard.page_description.draft_themes')}
      backgroundColor="light"
      borderWidth={0}
      radius={6}
      css={{
        padding: '20px',
        marginBottom: '30px',
      }}
    >
      <View ref={itemRef}>
        <AsyncComponent
          status={getClientThemesStatus}
          Success={themes.map((item, index) => {
            const date = item.modifiedDateTimestamp
              ? `Last saved: ${timeConverter(item.modifiedDateTimestamp)}`
              : `Added: ${timeConverter(item.createdDateTimestamp)} ago`;
            return (
              <DraftBox
                data-id={item.commandId}
                title={
                  <>
                    {item.label}{' '}
                    {justAdded && index === 0 ? (
                      <Text tagName="span" css={styles.draftThemeLatest}>
                        Just added
                      </Text>
                    ) : null}
                  </>
                }
                image={item.featuredImage}
                key={item.commandId ?? index}
                slug={date}
                loading={deleteClientThemeStatus[item.commandId] === 'loading' || activeThemeVedaStatus[item.commandId] === 'loading'}
                onClick={customTheme(item)}
                onClickDropdown={val => {
                  if (val === 'delete') {
                    deleteClientTheme.request({ commandId: item.commandId });
                  }
                }}
                Right={[
                  ...(themeActivate.commandId === item.commandId ? [] : [renderRightAction(item)]),
                  <View
                    key={'button_customize'}
                    css={styles.dropdown}
                    backgroundColor={'light'}
                    borderWidth={1}
                    borderStyle="solid"
                    borderColor="gray4"
                    onClick={customTheme(item)}
                  >
                    {i18n.t('adminDashboard.customize')}
                  </View>,
                ]}
              />
            );
          })}
        />

        {hasNextPage && (
          <View css={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              color="primary"
              backgroundColor="gray5"
              radius={6}
              css={styles.button}
              onClick={handleLoadMore}
              loading={loadMoreClientThemesStatus === 'loading'}
            >
              <View css={styles.buttonFlex}>
                {loadMoreClientThemesStatus === 'loading' ? null : <FontAwesome type="fas" name="angle-down" />}
                <Text css={{ marginLeft: '10px' }}>{i18n.t('general.load_more')}</Text>
              </View>
            </Button>
          </View>
        )}
      </View>
    </Box.WithTitle>
  );
};

export default DraftThemes;
