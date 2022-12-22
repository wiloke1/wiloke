import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import { CheckProgress } from 'components/CircleProgress';
import { CopyButton } from 'components/CopyButton/CopyButton';
import MyModal from 'components/MyModal';
import Tooltip from 'components/Tooltip';
import { useSetAddonsPositionStart } from 'containers/BuilderPage/store/addonPosition/slice';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRemoveAddonsInSection } from 'store/actions/actionPages';
import { pageSectionsSelector } from 'store/selectors';
import { i18n } from 'translation';
import { getAddonHtml } from 'utils/functions/getAddonHtml';
import { css, FontAwesome, Space, Text, View } from 'wiloke-react-core';
export interface AddonStaticActionsProps {
  addonsSectionId: string;
}

const styles = {
  container: css`
    debug: AddonStaticActions_container;
    display: flex;
    padding-bottom: 12px;
  `,
  btnSmall: css`
    debug: AddonStaticActions_btnSmall;
    width: 44px;
    height: 44px;
    padding: 0;
  `,
};

export const AddonStaticActions: FC<AddonStaticActionsProps> = ({ addonsSectionId }) => {
  const setAddonsPositionStart = useSetAddonsPositionStart();
  const pageSections = useSelector(pageSectionsSelector);
  const addonIds = pageSections.flatMap(section => section.addonIds ?? []);
  const pageHasAddon = addonIds.includes(addonsSectionId);
  const sectionHasAddons = pageSections.filter(item => (item.addonIds ?? []).includes(addonsSectionId)).filter(Boolean);
  const removeAddonsInSection = useRemoveAddonsInSection();

  const [visible, setVisible] = useState(false);
  const [sectionIds, setSectionIds] = useState<string[]>([]);

  const handleRemoveAddonsInSection = () => {
    if (sectionIds.length > 0) {
      removeAddonsInSection(sectionIds, addonsSectionId);
      // pmParent.emit('@rerender', { sectionId: sectionIds, action: 'AddonStaticActions.tsx' });
    }
    setVisible(false);
    setSectionIds([]);
  };

  return (
    <View css={styles.container}>
      <Button
        block
        radius={4}
        size="small"
        fontSize={13}
        css={{ height: '44px' }}
        backgroundColor="gray3"
        color="gray8"
        onClick={() => {
          setAddonsPositionStart({ value: true, addonsSectionId });
        }}
      >
        {i18n.t('general.addon_pick_position')}
      </Button>
      <Tooltip portal text={i18n.t('general.copy_code')} css={{ marginLeft: '5px' }}>
        <CopyButton
          radius={4}
          size="small"
          css={styles.btnSmall}
          backgroundColor="gray3"
          color="gray8"
          Copy={<FontAwesome type="far" name="copy" />}
          Copied={<CheckProgress css={{ width: '18px', height: '18px' }} />}
          content={getAddonHtml(addonsSectionId)}
        />
      </Tooltip>
      {pageHasAddon && (
        <Tooltip portal text={i18n.t('general.remove_from_sections')} css={{ marginLeft: '5px' }}>
          <Button
            block
            radius={4}
            size="small"
            fontSize={13}
            css={styles.btnSmall}
            backgroundColor="gray3"
            color="gray8"
            onClick={() => {
              // Bấm vào đây sẽ mở 1 modal gần giống section khi xoá có chứa addons
              setVisible(true);
            }}
          >
            <FontAwesome type="far" name="trash" />
          </Button>
        </Tooltip>
      )}

      <MyModal
        isVisible={visible}
        onCancel={() => {
          setVisible(false);
          setSectionIds([]);
        }}
        onOk={handleRemoveAddonsInSection}
        headerText={i18n.t('general.remove_from_sections')}
      >
        <Text>{i18n.t('builderPage.remove_addons_in_sections')}</Text>
        <Space size={10} />
        {sectionHasAddons.map(item => (
          <View key={item.id}>
            <Checkbox
              checked={sectionIds.includes(item.id)}
              onValueChange={isSelect => {
                if (isSelect) {
                  setSectionIds([...sectionIds, item.id]);
                } else {
                  const _removeId = sectionIds.filter(id => id !== item.id);
                  setSectionIds(_removeId);
                }
              }}
            >
              {item.label}
            </Checkbox>
            <Space size={10} />
          </View>
        ))}
      </MyModal>
    </View>
  );
};
