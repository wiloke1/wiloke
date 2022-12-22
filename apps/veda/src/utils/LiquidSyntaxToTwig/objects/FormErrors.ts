/** @link https://shopify.dev/api/liquid/objects#form_errors */

export interface FormErrors {
  messages: Record<string, any>;
  translated_fields: Record<string, any>;
}
