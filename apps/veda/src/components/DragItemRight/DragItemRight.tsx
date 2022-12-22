import BoxCenter from 'components/BoxCenter';
import Tooltip from 'components/Tooltip';
import { FC } from 'react';
import { i18n } from 'translation';
import { FontAwesome, FontAwesomeBrandsName, FontAwesomeName, Space } from 'wiloke-react-core';

export interface DragItemRightProps {
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onDeleteMouseUp?: () => void;
  onDuplicateMouseUp?: () => void;
  additionalItems?: Array<{
    onClick?: () => void;
    onMouseUp?: () => void;
    iconName: FontAwesomeName | FontAwesomeBrandsName;
    text: string;
    key: string;
    disabled: boolean;
  }>;
}

const DragItemRight: FC<DragItemRightProps> = ({ onEdit, onDuplicate, onDelete, onDeleteMouseUp, onDuplicateMouseUp, additionalItems }) => {
  const renderAdditionalItems = () => {
    return additionalItems?.map(({ iconName, onClick, onMouseUp, text, disabled, key }) => {
      return (
        <Tooltip portal text={text} key={key}>
          <BoxCenter size={22} disabled={disabled} onClick={onClick} onMouseUp={onMouseUp}>
            <FontAwesome type="far" name={iconName} size={12} color="gray6" />
          </BoxCenter>
        </Tooltip>
      );
    });
  };

  return (
    <>
      {renderAdditionalItems()}
      {!!onEdit && (
        <Tooltip portal text={i18n.t('general.edit')}>
          <BoxCenter size={22} onClick={onEdit}>
            <FontAwesome type="far" name="pencil" size={12} color="gray6" />
          </BoxCenter>
        </Tooltip>
      )}
      {!!onDuplicate && (
        <Tooltip portal text={i18n.t('general.duplicate')}>
          <BoxCenter size={22} onClick={onDuplicate} onMouseUp={onDuplicateMouseUp}>
            <FontAwesome type="far" name="copy" size={12} color="gray6" />
          </BoxCenter>
        </Tooltip>
      )}
      {!!onDelete && (
        <Tooltip portal text={i18n.t('general.remove')}>
          <BoxCenter size={22} onClick={onDelete} onMouseUp={onDeleteMouseUp}>
            <FontAwesome type="far" name="trash" size={12} color="gray6" />
          </BoxCenter>
        </Tooltip>
      )}
      <Space width={8} />
    </>
  );
};

export default DragItemRight;
