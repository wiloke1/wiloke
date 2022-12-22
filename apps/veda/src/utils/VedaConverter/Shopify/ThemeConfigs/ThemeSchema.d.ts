import { ArticleField } from '../InputSettings/ArticleField';
import { BlogField } from '../InputSettings/BlogField';
import { CheckboxField } from '../InputSettings/CheckboxField';
import { CollectionField } from '../InputSettings/CollectionField';
import { NumberField } from '../InputSettings/NumberField';
import { ProductField } from '../InputSettings/ProductField';
import { ProductListField } from '../InputSettings/ProductListField';
import { RadioField } from '../InputSettings/RadioField';
import { SelectField } from '../InputSettings/SelectField';
import { TextareaField } from '../InputSettings/TextareaField';
import { TextField } from '../InputSettings/TextField';
import { HeaderField } from '../SidebarSettings/HeaderField';
import { ParagraphField } from '../SidebarSettings/ParagraphField';

export interface ThemeSchema {
  name: string;
  settings: Array<
    | ArticleField
    | BlogField
    | CheckboxField
    | CollectionField
    | HeaderField
    | ParagraphField
    | ProductField
    | ProductListField
    | RadioField
    | NumberField
    | SelectField
    | TextareaField
    | TextField
  >;
}
