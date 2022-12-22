import { RoleException } from 'utils/constants/constants';
import { getUserInfo } from 'utils/functions/getUserInfo';
import { pageApis } from '../apis';

interface ForkPageAtom {
  commandId: string;
}

export const forkPageAtom = ({ commandId }: ForkPageAtom) => {
  const { role } = getUserInfo();
  if (role === 'dev') {
    return pageApis.atom.devApi.page.forkAtom({ parentCommandId: commandId });
  }
  throw new RoleException();
};
