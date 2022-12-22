import strToRegexpPattern from 'utils/functions/strToRegexpPattern';
import { LiquidSyntaxToTwigError } from '../Error';
import { getMatches } from './getMatches';

interface ValidateLiquidSyntaxNestable {
  BOC: string;
  name: string;
  errorMessage: string;
}

export const validateLiquidSyntaxNestable = ({ BOC, name, errorMessage }: ValidateLiquidSyntaxNestable) => {
  if (getMatches(BOC, new RegExp(`{%\s*${strToRegexpPattern(name)}\.*%}`, 'gm')).length > 1) {
    throw new LiquidSyntaxToTwigError(errorMessage);
  }
};
