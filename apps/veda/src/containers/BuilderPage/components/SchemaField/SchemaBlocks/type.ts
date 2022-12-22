import { PageSection } from 'types/Sections';
import { SettingBlock } from 'types/Schema';
import { OnUpdate } from './reducer';

export interface SchemaBlocksProps {
  section: PageSection;
  onChange?: (result: SettingBlock[]) => void;
  onUpdate?: (action: OnUpdate) => void;
}
