import { FormErrors } from './FormErrors';
import { DeepNullable } from './@utils';

export type ErrorType = 'author' | 'body' | 'email' | 'password' | 'form' | 'country';

/** @link https://shopify.dev/api/liquid/objects#form */
interface _Form {
  address1: string;
  address2: string;
  author: string;
  body: string;
  city: string;
  company: string;
  country: string;
  email: string;
  errors: FormErrors | null;
  first_name: string;
  id: number;
  last_name: string;
  password_needed: boolean;
  phone: string;
  posted_successfully?: boolean;
  province: string;
  set_as_default_checkbox: string;
  zip: string;
}

export type Form = DeepNullable<_Form> | null;
