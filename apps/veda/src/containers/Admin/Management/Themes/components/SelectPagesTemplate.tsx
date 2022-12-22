import Field from 'components/Field';
import SelectAntd from 'components/SelectAntd';
import { FC, memo, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'translation';
import { PageType } from 'types/Page';
import { useGetPagesTemplate, useLoadMorePagesTemplate } from '../store/actions/actionPagesTemplate';
import { pagesTemplateSelector } from '../store/reducers/slicePagesTemplate';

interface Props {
  pageType: PageType;
  onChange: (value: string) => void;
  value?: any;
  isLoading?: boolean;
  disabled?: boolean;
}

const SelectPagesTemplateComponent: FC<Props> = ({ pageType, value, isLoading = false, disabled = false, onChange }) => {
  const { data } = useSelector(pagesTemplateSelector);
  const { items, getStatus, hasNextPage, loadmoreStatus } = useMemo(() => data[pageType], [data, pageType]);

  const getPagesTemplate = useGetPagesTemplate();
  const loadmorePagesTemplate = useLoadMorePagesTemplate();

  useEffect(() => {
    getPagesTemplate.request({ pageType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Field
      note={disabled ? i18n.t('adminDashboard.no_cheating_page') : undefined}
      noteIcon="exclamation-circle"
      color={disabled ? 'danger' : undefined}
      label={pageType}
    >
      <SelectAntd
        value={value}
        disabled={disabled}
        loading={getStatus === 'loading' || loadmoreStatus === 'loading' || isLoading}
        data={items.map(item => ({ label: item.label, value: item.commandId }))}
        onChange={onChange}
        onPopupScroll={e => {
          const { scrollHeight, scrollTop, clientHeight } = e.target as Element;
          if (scrollHeight - scrollTop - clientHeight < 300 && getStatus === 'success' && hasNextPage) {
            const lastCursor = items[items.length - 1].commandId;
            loadmorePagesTemplate.request({
              pageType,
              cursor: lastCursor,
            });
          }
        }}
      />
    </Field>
  );
};

export const SelectPagesTemplate = memo(SelectPagesTemplateComponent);
