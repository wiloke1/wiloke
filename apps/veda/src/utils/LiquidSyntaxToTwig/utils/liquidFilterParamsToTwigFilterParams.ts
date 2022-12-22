import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { getMatches } from './getMatches';

interface LiquidFilterParamsToTwigFilterParams {
  liquid: string;
  liquidFilterName: string;
  twigFilterName: string;
}

/**
 * Xử lí biến param cho filter của liquid thành params cho filter của twig
  TODO: Liệu có cần xét từng block {{...}} và {%...%} để tăng độ chính xác
  @description
  Input: {{  filter_with_params: params_value }}
  Output: {{ filter_with_params(params_value) }}

  @example
  Input:
  {
    liquid: "{{ 10 | divided_by: 100 | times: 100 }}",
    liquidFilterName: 'times',
    twigFilterName: 'times'
  }
  Output: "{{ 10 | divided_by: 100 | times(100) }}"

  @example
  Input:
  {
    liquid: "{{ 10 | divided_by: 100 | times: 100 | plus: 30 | minus: 10 }}",
    liquidFilterName: 'times',
    twigFilterName: 'times'
  }
  Output: "{{ 10 | divided_by: 100 | times(100) | plus: 30 | minus: 10 }}"
*/
export const liquidFilterParamsToTwigFilterParams = ({ liquid, liquidFilterName, twigFilterName }: LiquidFilterParamsToTwigFilterParams) => {
  // Regex cho trường hợp filter là filter cuối cùng đc sử dụng trong block
  const regex1 = new RegExp(`\\|\\s*${strToRegexpPattern(liquidFilterName)}:\\s*(\.*)(?=}}\|%}\|\\|)`, 'gm');
  // Regex cho trường hợp filter là filter ở vị trí bất kì đc sử dụng trong block
  const regex2 = new RegExp(`\\|\\s*${strToRegexpPattern(liquidFilterName)}:\\s*(\.*)`, 'gm');
  // Xử lí trường hợp split là filters cuối cùng trước -> trường hợp này đc xử lí xong sẽ chỉ còn trường hợp split đứng vị trí bất kì không phải cuối cùng
  return (
    liquid
      // Xuống dòng để regex
      .replaceAll('|', '\n|')
      .replaceAll('}}', '}}\n')
      .replaceAll('%}', '%}\n')
      .replace(regex1, value => {
        const [, parametersClause] = getMatches(value, new RegExp(regex2));
        if (parametersClause) {
          return `| ${twigFilterName}(${parametersClause.trim()})`;
        }
        return value;
      })
      .replace(regex2, value => {
        const [, parametersClause] = getMatches(value, new RegExp(regex2));
        if (parametersClause) {
          return `| ${twigFilterName}(${parametersClause.trim()})`;
        }
        return value;
      })
      // Xoá "\n" được thêm vào để regex
      .replaceAll('\n|', '|')
      .replaceAll('}}\n', '}}')
      .replaceAll('%}\n', '%}')
  );
};
