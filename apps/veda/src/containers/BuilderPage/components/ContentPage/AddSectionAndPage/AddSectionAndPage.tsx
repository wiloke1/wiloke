import Title from 'components/Title';
import TemplateContent from 'containers/Admin/PageBuilder/TemplatesPage/components/Content';
import { FC } from 'react';
import { i18n } from 'translation';
import { css, Divider, View } from 'wiloke-react-core';
import { AddSection } from './AddSection/AddSection';

const styles = {
  container: css`
    padding-top: 40px;
    padding-bottom: 40px;
    min-height: 100vh;
  `,
  divider: css`
    padding-top: 40px;
    padding-bottom: 40px;
  `,
  content: css`
    padding-left: 40px;
    padding-right: 40px;
  `,
};

export const AddSectionAndPage: FC = () => {
  return (
    <View backgroundColor="light" css={styles.container}>
      <View container>
        <AddSection />
      </View>
      <View css={styles.divider}>
        <Divider />
      </View>
      <View css={styles.content}>
        <Title title={i18n.t('adminDashboard.page_templates')} text="Lorem ipsum dolor sit amet" titleCss={{ fontSize: '30px' }} />
        <TemplateContent />
      </View>
    </View>
  );
};
