import { compose } from 'ramda';
import { handleBOCDelimiters, handleReplaceGeneralOpenCloseBlock } from './preprocess';
import { handleBOCDelimiters as handleBOCDelimitersPostprocess } from './postprocess';

interface HandleTranslationToPreview {
  liquid: string;
}

const handleReplaceVedaTranslationToVedaPreviewTranslation = (liquid: string) => {
  return liquid.replace(/({{|{%).*\|\s*t.*(%}|}})/g, value => {
    if (/veda\.[\w.]*/g.test(value)) {
      return value.replace('veda.', 'veda-pv.');
    }
    return value;
  });
};

export const handleTranslationToPreview = ({ liquid }: HandleTranslationToPreview) => {
  const preprocessDataFlow = compose(handleReplaceGeneralOpenCloseBlock, handleBOCDelimiters);
  const preprocessData = preprocessDataFlow(liquid);

  return handleBOCDelimitersPostprocess(handleReplaceVedaTranslationToVedaPreviewTranslation(preprocessData));
};
