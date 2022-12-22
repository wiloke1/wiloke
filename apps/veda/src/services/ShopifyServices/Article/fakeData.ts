import { ArticlesApiData } from 'types/Articles';
import createState from 'utils/functions/createState';
import delay from 'utils/functions/delay';

const articleState = createState<ArticlesApiData[]>([]);

export async function getArticles(search: string) {
  await delay(300);
  return articleState.getState().filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
}
