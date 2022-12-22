import { handleTagLiquidTagBeforeSyncShopify } from 'utils/LiquidSyntaxToTwig';
import { ExpectReturnType } from './@types/ExpectReturnType';
import { getHtmlFiles } from './getHtmlFiles';

export const handleCssInlines = (data: ReturnType<typeof getHtmlFiles>): ExpectReturnType[] => {
  return data.reduce<ExpectReturnType[]>((res, file) => {
    const html = handleTagLiquidTagBeforeSyncShopify({ liquidFile: file.content });
    return res.concat({
      ...file,
      content: html,
    });
  }, []);
};
