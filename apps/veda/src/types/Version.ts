import { SectionChangelog } from './Sections';

export interface VersionSection {
  id: string;
  sectionId: SectionChangelog['versionId'];
  version: SectionChangelog['version'];
  /** Lich su toan thay doi tu truoc den nay */
  changelogs: Array<{
    version: SectionChangelog['version'];
    description: SectionChangelog['content'];
    createdDateTimestamp?: SectionChangelog['createdDateTimestamp'];
    modifiedDateTimestamp?: SectionChangelog['modifiedDateTimestamp'];
  }>;
}
