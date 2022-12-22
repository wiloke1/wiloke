import Field from 'components/Field';
import { FC } from 'react';
import { i18n } from 'translation';
import { SchemaSettingType } from 'types/Schema';
import { FormSchemaSettingProps } from '../../type';
import { Animate } from './Animate/Animate';
import { AnimateInOut } from './AnimateInOut/AnimateInOut';
import { Color } from './Color/Color';
import { DatePicker } from './DatePicker/DatePicker';
import { FlexOrder } from './FlexOrder/FlexOrder';
import { Font } from './Font/Font';
import { Responsive } from './Responsive/Responsive';
import { Select_RadioGroup } from './Select_RadioGroup/Select_RadioGroup';
import { Slider } from './Slider/Slider';
import { Space } from './Space/Space';
import { Switch } from './Switch/Switch';
import { Tags } from './Tags/Tags';
import { Text } from './Text/Text';
import { Textarea } from './Textarea/Textarea';
import { TextEditor } from './TextEditor/TextEditor';

export const DefaultValueField: FC<FormSchemaSettingProps> = props => {
  const renderMappings: Record<SchemaSettingType, any> = {
    color: <Color {...props} />,
    date: <DatePicker {...props} />,
    flexOrder: <FlexOrder {...props} />,
    font: <Font {...props} />,
    linkPicker: null,
    responsive: <Responsive {...props} />,
    select: <Select_RadioGroup {...props} />,
    radioGroup: <Select_RadioGroup {...props} />,
    space: <Space {...props} />,
    icon: <Text {...props} />,
    image: null,
    slider: <Slider {...props} />,
    switch: <Switch {...props} />,
    text: <Text {...props} />,
    styleBox: null,
    textarea: <Textarea {...props} />,
    navigation: null,
    collectionPicker: null,
    productPicker: null,
    video: null,
    blogPicker: '',
    articlePicker: '',
    textReadOnly: <TextEditor {...props} />,
    tags: <Tags {...props} />,
    richText: <TextEditor {...props} />,
    hidden: null,
    divider: null,
    products: null,
    animate: <Animate {...props} />,
    animateInOut: <AnimateInOut {...props} />,
  };

  const { data } = props;

  if (!renderMappings[data.type]) {
    return null;
  }

  return <Field label={i18n.t('schema.value', { text: i18n.t('schema.default'), textTransform: 'capitalize' })}>{renderMappings[data.type]}</Field>;
};
