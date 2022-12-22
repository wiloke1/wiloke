import { useSetPreviewLoaded } from 'containers/BuilderPage/store/previewLoaded/slice';
import { FC } from 'react';
import { i18n } from 'translation';
import getPageInfo from 'utils/functions/getInfo';
import { pmPopup } from 'utils/functions/postMessage';
import { css, Theme, View } from 'wiloke-react-core';

const styles = {
  container: ({ colors, fonts }: Theme) => css`
    font-family: ${fonts.secondary};
    font-weight: 500;
    background-color: ${colors.light};
    height: 35px;
    padding: 0 15px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid ${colors.gray3};
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
};

export const LivePreview: FC = () => {
  const setPreviewLoaded = useSetPreviewLoaded();
  const id = getPageInfo('id');
  const themeId = getPageInfo('themeId');
  const shop = getPageInfo('shop');

  return (
    <View
      css={styles.container}
      onClick={() => {
        setPreviewLoaded(false);
        pmPopup.setPopup(`/preview?shop=${shop}&id=${id}${themeId ? `&themeId=${themeId}` : ''}`);
      }}
    >
      {i18n.t('general.live_preview')}
    </View>
  );
};
