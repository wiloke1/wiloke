import { SectionChangelog } from './Sections';

export interface AppSettings {
  /** Thay đổi những gì ở phiên bản này */
  currentVersion: SectionChangelog;
  /** Typescript suggestions cho editcode phần js */
  tsSuggestions: string;
  /** Bật tab js hook tại màn hình code */
  jsHookEnabled: boolean;
}
