import Tooltip from 'components/Tooltip';
import { FC, memo, useMemo } from 'react';
import { i18n } from 'translation';
import { createPortal } from 'utils/functions/createPortal';
import { FontAwesome, View } from 'wiloke-react-core';
import * as styles from './styles';

export type ActionType = 'add_to_top' | 'add_to_bottom' | 'delete' | 'duplicate' | 'up' | 'down';

export interface ComponentToolbarProps {
  isMegamenu: boolean;
  inset?: boolean;
  title: string;
  top: number;
  left: number;
  width: number;
  height: number;
  active?: boolean;
  disabledNext?: boolean;
  disabledPrevious?: boolean;
  nextText?: string;
  prevText?: string;
  onAction?: (type: ActionType, event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onHover?: (value: boolean) => void;
}

const ComponentToolbar: FC<ComponentToolbarProps> = ({
  isMegamenu,
  title,
  top,
  left,
  width,
  height,
  active = false,
  inset = false,
  disabledNext = false,
  disabledPrevious = false,
  onAction,
  onHover,
  nextText = i18n.t('builderPage.move_to.next'),
  prevText = i18n.t('builderPage.move_to.previous'),
}) => {
  const renderContent = () => {
    if (isMegamenu) {
      return (
        <View
          css={styles.container(top, left, width, height, isMegamenu)}
          onMouseEnter={() => {
            onHover?.(true);
          }}
          onMouseLeave={() => {
            onHover?.(false);
          }}
        >
          <View css={styles.actions(active, inset, isMegamenu)}>
            <View css={styles.title}>
              {i18n.t('general.megamenu', { textTransform: 'capitalize' })}: {title}
            </View>
          </View>
        </View>
      );
    }
    return (
      <View
        css={styles.container(top, left, width, height)}
        onMouseEnter={() => {
          onHover?.(true);
        }}
        onMouseLeave={() => {
          onHover?.(false);
        }}
      >
        <View css={styles.actions(active, inset)}>
          <View css={styles.title}>{title}</View>
          {active && (
            <View css={styles.actionsContent}>
              <Tooltip
                text={disabledPrevious ? i18n.t('builderPage.move_to.disable') : prevText}
                placement={inset ? 'bottom' : 'top'}
                css={styles.action(disabledPrevious)}
                onClick={event => {
                  if (disabledPrevious) {
                    return;
                  }
                  onAction?.('up', event);
                }}
              >
                <FontAwesome type="far" name="arrow-up" size={16} color="light" />
              </Tooltip>
              <Tooltip
                text={disabledNext ? i18n.t('builderPage.move_to.disable') : nextText}
                placement={inset ? 'bottom' : 'top'}
                css={styles.action(disabledNext)}
                onClick={event => {
                  if (disabledNext) {
                    return;
                  }
                  onAction?.('down', event);
                }}
              >
                <FontAwesome type="far" name="arrow-down" size={16} color="light" />
              </Tooltip>
              <Tooltip
                text={i18n.t('general.duplicate')}
                placement={inset ? 'bottom' : 'top'}
                css={styles.action(false)}
                onClick={event => onAction?.('duplicate', event)}
              >
                <FontAwesome type="far" name="copy" size={16} color="light" />
              </Tooltip>
              <Tooltip
                text={i18n.t('general.delete')}
                placement={inset ? 'bottom' : 'top'}
                css={styles.action(false)}
                onClick={event => onAction?.('delete', event)}
              >
                <FontAwesome type="far" name="trash" size={16} color="light" />
              </Tooltip>
            </View>
          )}
        </View>
        {active && (
          <>
            <View css={styles.addWrap('top', inset)}>
              <Tooltip
                text={i18n.t('general.add_section_to_top')}
                placement={inset ? 'bottom' : 'top'}
                css={styles.add}
                onClick={event => onAction?.('add_to_top', event)}
              >
                <FontAwesome type="far" name="plus" size={20} color="light" />
              </Tooltip>
            </View>
            <View css={styles.addWrap('bottom', inset)}>
              <Tooltip text={i18n.t('general.add_section_to_bottom')} css={styles.add} onClick={event => onAction?.('add_to_bottom', event)}>
                <FontAwesome type="far" name="plus" size={20} color="light" />
              </Tooltip>
            </View>
          </>
        )}
      </View>
    );
  };

  const Content = useMemo(() => {
    return renderContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMegamenu, title, top, left, width, height, active, inset]);

  if (!active) {
    return null;
  }

  return createPortal(Content);
};

export default memo(ComponentToolbar);
