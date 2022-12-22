import { sectionApiController } from 'services/SectionService';
import { adapterGetSection } from 'services/SectionService/Adapters/adapterGetSection';
import { ProductSection } from 'types/Sections';

export const installClientSection = async (commandId: string) => {
  const response = await sectionApiController.atom.publishApi.sections.getAtom({ commandId });

  if (response.status === 200) {
    const transformData = adapterGetSection(response.data.info) as ProductSection;
    return {
      data: {
        ...transformData,
        commandId: '',
        parentCommandId: transformData.commandId,
      },
      message: response.data.message,
    };
  } else {
    return {
      data: undefined,
      message: response.data.message,
    };
  }
};
