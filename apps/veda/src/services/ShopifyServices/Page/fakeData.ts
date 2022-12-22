import { ResponseShopifyPages } from 'types/Pages';
import createState from 'utils/functions/createState';
import delay from 'utils/functions/delay';

const pageState = createState<ResponseShopifyPages>({
  info: [],
  message: 'success',
  hasNextPage: false,
});

export async function getPages(search: string) {
  await delay(300);
  return pageState.getState().info.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
}
