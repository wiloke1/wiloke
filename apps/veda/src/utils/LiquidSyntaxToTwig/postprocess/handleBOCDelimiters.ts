/**
 * Function thực hiện xử lí những dấu "\n" được sinh ra bởi "preprocess/handleBOCDelimiters"
 * => Nếu không xử lí thì script json hay nhiều thứ khác sẽ lỗi
 * NOTE: @tuong -> Nếu update file này cần xem xét việc update cả file preprocess/handleBOCDelimiters
 * @example
 * Input:
    const a = {
      id: {{ product.id }}
      ,
      handle: {{ product.handle }}
      ,
      ...
    }
  * Output:
    const a = {
      id: {{ product.id }},
      handle: {{ product.handle }},
      ...
    }
 */
export const handleBOCDelimiters = (liquid: string) => {
  return liquid.replace(/(}}|%})\n+/g, value => value.replaceAll('\n', ''));
};
