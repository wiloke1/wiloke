import createState from 'utils/functions/createState';
import delay from 'utils/functions/delay';
import { ResponseTemplatePage } from '../service';

const templateState = createState<ResponseTemplatePage>({
  info: [],
  message: 'success',
});

async function getTemplates() {
  await delay(500);
  return templateState.getState();
}

export { getTemplates };
