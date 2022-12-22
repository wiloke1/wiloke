import ChooseImage from 'components/ChooseImage';
import ColorPicker2 from 'components/ColorPicker2';
import Field from 'components/Field';
import FieldGroup from 'components/FieldGroup';
import FontField, { GoogleFonts } from 'components/FontField/FontField';
import Radio from 'components/Radio';
import SelectAntd, { Option } from 'components/SelectAntd';
import SliderBeauty from 'components/SliderBeauty';
import SpaceField from 'components/SpaceField';
import { useStackNavigator } from 'components/StackNavigator';
import Switch from 'components/Switch';
import SwitchBeauty from 'components/SwitchBeauty';
import withDebounce from 'hocs/withDebounce';
import { isEqual, omit } from 'lodash';
import { FC, useRef, useState } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { i18n } from 'translation';
import { CssColorVariable } from 'types/PresetStyles';
import { imageUrl } from 'utils/functions/imageUrl';
import { Space, View } from 'wiloke-react-core';
import { LeftBarParamList } from '../SidebarScreen/SidebarScreen';
import { BoxShadow } from './BoxShadow';
import { CSSProp, CSSPropKey } from './types';
import { defaultValue, getSpaceObj, removeKey, removeKeyUndefined, replaceUnit, replaceUrl } from './utils';

export interface SingleStyleProps {
  css: CSSProp;
  fonts?: GoogleFonts[];
  colors: CssColorVariable[];
  onChange?: (css: CSSProp) => void;
  onAddOrEditColor?: () => void;
}

const SliderBeautyDebounce = withDebounce(SliderBeauty, 'value', 'onValueChange', 300);

export const SingleStyle: FC<SingleStyleProps> = ({ onChange, onAddOrEditColor, css, fonts, colors }) => {
  const [cssState, setCssState] = useState(css);
  const prevCssStateRef = useRef(cssState);
  const active = (key: CSSPropKey) => Object.keys(cssState).some(item => item === key || item.startsWith(`${key}-`));
  const navigation = useStackNavigator<LeftBarParamList>();
  const mountedRef = useRef(false);
  const typoVisibleRef = useRef(
    active('text-align') ||
      active('color') ||
      active('font-family') ||
      active('font-size') ||
      active('font-style') ||
      active('font-weight') ||
      active('letter-spacing') ||
      active('line-height') ||
      active('text-decoration') ||
      active('text-transform'),
  );
  const bgVisibleRef = useRef(active('backgroundColor') || active('background'));
  const sizeVisibleRef = useRef(active('width') || active('height'));
  const spaceVisibleRef = useRef(active('padding') || active('margin'));
  const borderVisibleRef = useRef(
    active('border-width') || active('border-style') || active('border-color') || active('border-radius') || active('box-shadow'),
  );
  const transitionVisibleRef = useRef(active('transition-duration') || active('transition-timing-function') || active('transition-delay'));

  useDeepCompareEffect(() => {
    setCssState(css);
  }, [css]);

  useDeepCompareEffect(() => {
    if (mountedRef.current && !isEqual(removeKeyUndefined(prevCssStateRef.current), removeKeyUndefined(cssState))) {
      onChange?.(cssState);
    }

    mountedRef.current = true;
    prevCssStateRef.current = cssState;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cssState]);

  const handleSetState = (css: Partial<CSSProp> = {}) => {
    setCssState(cssState => ({ ...cssState, ...css }));
  };

  const renderFieldRight = (key: CSSPropKey) => {
    return (
      <Switch
        checked={active(key)}
        size="extra-small"
        onValueChange={value => {
          if (!value) {
            setCssState(css => removeKey(css, key as keyof CSSProp) as CSSProp);
          } else {
            setCssState(css => ({
              ...css,
              [key]: defaultValue[key],
            }));
          }
        }}
      />
    );
  };

  const renderSpace = (label: string, key: CSSPropKey) => {
    const space = getSpaceObj({ ...defaultValue, ...cssState }, key);
    return (
      <Field label={`${label} (px)`} fontSize={13} Right={renderFieldRight(key)}>
        {active(key) && (
          <SpaceField
            top={space.top}
            right={space.right}
            bottom={space.bottom}
            left={space.left}
            onChangeAll={() => {
              if (space.top !== undefined) {
                setCssState(css => ({
                  ...css,
                  [`${key}-top`]: `${space.top}px`,
                  [`${key}-right`]: `${space.top}px`,
                  [`${key}-bottom`]: `${space.top}px`,
                  [`${key}-left`]: `${space.top}px`,
                }));
              }
            }}
            onChange={(placement, value) => {
              if (value === undefined) {
                setCssState(css => omit(css, [`${key}-${placement}`]) as CSSProp);
              } else {
                setCssState(css => {
                  return {
                    ...css,
                    [`${key}-${placement}` as any]: value === undefined ? value : `${value}px`,
                  };
                });
              }
            }}
          />
        )}
      </Field>
    );
  };

  const renderSlider = (label: string, key: CSSPropKey, unit = 'px', min = 0, max = 200, step = 1) => {
    const _unit = !!unit ? ` (${unit})` : '';
    return (
      <Field label={`${label}${_unit}`} fontSize={13} Right={renderFieldRight(key)}>
        {active(key) && (
          <SliderBeautyDebounce
            value={replaceUnit(cssState[key] ?? defaultValue[key])}
            min={min}
            max={max}
            step={step}
            radius={6}
            borderColor="gray3"
            borderWidth={1}
            borderInputColor="gray3"
            clearEnabled
            onValueChange={value => {
              if (value === undefined) {
                setCssState(css => omit(css, [key]) as CSSProp);
              } else {
                setCssState(css => ({
                  ...css,
                  [key]: `${value}${unit}`,
                }));
              }
            }}
          />
        )}
      </Field>
    );
  };

  const renderFontFamily = (label: string, key: CSSPropKey) => (
    <Field label={label} fontSize={13} Right={renderFieldRight(key)}>
      {active(key) && (
        <FontField
          fonts={fonts}
          value={cssState[key] ?? defaultValue[key]}
          onChange={value => {
            if (!!value) {
              handleSetState({ [key]: value });
            } else {
              setCssState(css => omit(css, [key]) as CSSProp);
            }
          }}
        />
      )}
    </Field>
  );

  const renderColor = (label: string, key: CSSPropKey) => {
    return (
      <Field label={label} fontSize={13} Right={renderFieldRight(key)}>
        {active(key) && (
          <ColorPicker2
            color={cssState[key] ?? defaultValue[key]}
            onChange={value => {
              if (!!value) {
                handleSetState({ [key]: value });
              } else {
                setCssState(css => omit(css, [key]) as CSSProp);
              }
            }}
            onAddOrEditColor={onAddOrEditColor}
            data={colors}
          />
        )}
      </Field>
    );
  };

  const renderBoxShadow = (label: string, key: CSSPropKey) => {
    return (
      <Field label={label} fontSize={13} Right={renderFieldRight(key)}>
        {active(key) && (
          <BoxShadow
            value={cssState[key] ?? defaultValue[key]}
            colors={colors}
            onAddOrEditColor={onAddOrEditColor}
            onChange={value => {
              if (!!value) {
                handleSetState({ [key]: value });
              } else {
                setCssState(css => omit(css, [key]) as CSSProp);
              }
            }}
          />
        )}
      </Field>
    );
  };

  const renderSelect = (label: string, key: CSSPropKey, options: Option[]) => (
    <Field label={label} fontSize={13} Right={renderFieldRight(key)}>
      {active(key) && (
        <SelectAntd
          value={cssState[key] ?? defaultValue[key]}
          data={options}
          onChange={value => {
            if (!!value) {
              handleSetState({ [key]: value });
            } else {
              setCssState(css => omit(css, [key]) as CSSProp);
            }
          }}
        />
      )}
    </Field>
  );

  const renderRadioGroup = (label: string, key: CSSPropKey, options: Option[]) => (
    <Field label={label} fontSize={13} Right={renderFieldRight(key)}>
      {active(key) && (
        <Radio.Group
          value={cssState[key] ?? defaultValue[key]}
          block
          size="large"
          onChangeValue={value => {
            if (!!value) {
              handleSetState({ [key]: value });
            } else {
              setCssState(css => omit(css, [key]) as CSSProp);
            }
          }}
        >
          {options.map(item => {
            return (
              <Radio.Button key={item.value} value={item.value}>
                {item.label}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      )}
    </Field>
  );

  const renderBackgroundImage = (label: string) => {
    const key = 'background';
    const image = `${key}-image` as CSSPropKey;
    const attachment = `${key}-attachment` as CSSPropKey;
    const size = `${key}-size` as CSSPropKey;
    const position = `${key}-position` as CSSPropKey;

    return (
      <Field label={label} fontSize={13} Right={renderFieldRight(key)}>
        {active(key) && (
          <>
            <ChooseImage.Button
              image={{ src: replaceUrl(cssState[image] ?? defaultValue[image]), height: 0, width: 0 }}
              onClear={value => {
                if (!!value.src) {
                  handleSetState({ [image]: `url(${imageUrl(value.src, 10)})`, [position]: 'center' });
                } else if (!!cssState[image]) {
                  setCssState(css => omit(css, [image, position]) as CSSProp);
                }
              }}
              onClick={() => {
                navigation.push('chooseImageFieldScreen', {
                  value: {
                    src: cssState[image] ?? defaultValue[image],
                    width: 0,
                    height: 0,
                  },
                  onChange: value => {
                    if (!!value.src) {
                      handleSetState({ [image]: `url(${imageUrl(value.src, 10)})` });
                    } else if (!!cssState[image]) {
                      setCssState(css => omit(css, [image, position]) as CSSProp);
                    }
                  },
                  label,
                });
              }}
            />
            <Space size={10} />
            <Field label={i18n.t('general.background_fixed')} fontSize={13}>
              <SwitchBeauty
                checked={!!(cssState[attachment] ?? defaultValue[attachment])}
                radius={6}
                borderColor="gray3"
                borderWidth={1}
                enableText={i18n.t('general.enable')}
                disableText={i18n.t('general.disable')}
                onValueChange={value => {
                  if (value) {
                    handleSetState({ [attachment]: 'fixed' });
                  } else {
                    setCssState(css => omit(css, [attachment]) as CSSProp);
                  }
                }}
              />
            </Field>
            <Field label={i18n.t('general.background_size')} fontSize={13}>
              <SelectAntd
                value={cssState[size] ?? defaultValue[size] ?? 'cover'}
                data={[
                  { label: 'Cover', value: 'cover' },
                  { label: 'Contain', value: 'contain' },
                ]}
                onChange={value => {
                  if (!!value) {
                    handleSetState({ [size]: value });
                  } else {
                    setCssState(css => omit(css, [size]) as CSSProp);
                  }
                }}
              />
            </Field>
          </>
        )}
      </Field>
    );
  };

  return (
    <View>
      <FieldGroup
        visible={typoVisibleRef.current}
        label={i18n.t('general.typography')}
        containerCss={{ marginBottom: '5px' }}
        contentCss={{ paddingBottom: 0 }}
      >
        {renderRadioGroup(i18n.t('general.align'), 'text-align', [
          { label: i18n.t('general.left'), value: 'left' },
          { label: i18n.t('general.center'), value: 'center' },
          { label: i18n.t('general.right'), value: 'right' },
        ])}
        {renderColor(i18n.t('general.color'), 'color')}
        {renderFontFamily(i18n.t('general.font_family'), 'font-family')}
        {renderSlider(i18n.t('general.font_size'), 'font-size')}
        {renderSelect(i18n.t('general.font_style'), 'font-style', [
          { label: 'Normal', value: 'normal' },
          { label: 'Italic', value: 'italic' },
          { label: 'Oblique', value: 'oblique' },
        ])}
        {renderSlider(i18n.t('general.font_weight'), 'font-weight', '', 100, 900, 100)}
        {renderSlider(i18n.t('general.letter_spacing'), 'letter-spacing', 'px', 0, 20)}
        {renderSlider(i18n.t('general.line_height'), 'line-height', 'em', 0, 5, 0.1)}
        {renderSelect(i18n.t('general.text_decoration'), 'text-decoration', [
          { label: 'None', value: 'none' },
          { label: 'Underline', value: 'underline' },
          { label: 'Line Through', value: 'line-through' },
          { label: 'Overline', value: 'overline' },
        ])}
        {renderSelect(i18n.t('general.text_transform'), 'text-transform', [
          { label: 'None', value: 'none' },
          { label: 'Uppercase', value: 'uppercase' },
          { label: 'Lowercase', value: 'lowercase' },
          { label: 'Capitalize', value: 'capitalize' },
        ])}
      </FieldGroup>
      <FieldGroup
        visible={bgVisibleRef.current}
        label={i18n.t('general.background')}
        containerCss={{ marginBottom: '5px' }}
        contentCss={{ paddingBottom: 0 }}
      >
        {renderColor(i18n.t('general.background_color'), 'backgroundColor')}
        {renderBackgroundImage(i18n.t('general.background_image'))}
      </FieldGroup>
      <FieldGroup
        visible={sizeVisibleRef.current}
        label={i18n.t('general.size')}
        containerCss={{ marginBottom: '5px' }}
        contentCss={{ paddingBottom: 0 }}
      >
        {renderSlider(i18n.t('general.width'), 'width', 'px', 0, 2000)}
        {renderSlider(i18n.t('general.height'), 'height', 'px', 0, 2000)}
      </FieldGroup>
      <FieldGroup
        visible={spaceVisibleRef.current}
        label={i18n.t('general.space')}
        containerCss={{ marginBottom: '5px' }}
        contentCss={{ paddingBottom: 0 }}
      >
        {renderSpace(i18n.t('general.padding'), 'padding')}
        {renderSpace(i18n.t('general.margin'), 'margin')}
      </FieldGroup>
      <FieldGroup
        visible={borderVisibleRef.current}
        label={i18n.t('general.border_and_shadow')}
        containerCss={{ marginBottom: '5px' }}
        contentCss={{ paddingBottom: 0 }}
      >
        {renderSlider(i18n.t('general.width'), 'border-width')}
        {renderRadioGroup(i18n.t('general.style'), 'border-style', [
          { label: 'Solid', value: 'solid' },
          { label: 'Dashed', value: 'dashed' },
          { label: 'Dotted', value: 'dotted' },
        ])}
        {renderColor(i18n.t('general.color'), 'border-color')}
        {renderSlider(i18n.t('general.radius'), 'border-radius')}
        {renderBoxShadow('Box Shadow', 'box-shadow')}
      </FieldGroup>
      <FieldGroup
        visible={transitionVisibleRef.current}
        label={i18n.t('general.transition')}
        containerCss={{ marginBottom: '5px' }}
        contentCss={{ paddingBottom: 0 }}
      >
        {renderSlider(i18n.t('general.duration'), 'transition-duration', 'ms', 0, 3000)}
        {renderSelect(i18n.t('general.timing_function'), 'transition-timing-function', [
          { label: 'Linear', value: 'linear' },
          { label: 'Ease', value: 'ease' },
          { label: 'Ease in', value: 'ease-in' },
          { label: 'Ease out', value: 'ease-out' },
          { label: 'Ease in out', value: 'ease-in-out' },
        ])}
        {renderSlider(i18n.t('general.delay'), 'transition-delay', 'ms', 0, 3000)}
      </FieldGroup>
    </View>
  );
};
