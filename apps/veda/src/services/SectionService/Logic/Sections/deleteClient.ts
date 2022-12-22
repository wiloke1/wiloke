import { sectionApiController } from 'services/SectionService';

export const deleteClientSections = async ({ commandId }: { commandId: string }) => {
  return sectionApiController.client.clientApi.section.deleteClient({ commandId });
};
