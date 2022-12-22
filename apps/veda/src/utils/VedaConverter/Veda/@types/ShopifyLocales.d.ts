import { languages } from '../@consts/languages';

export type Locales<T extends any = Record<string, string>> = Record<typeof languages[number], T>;
