import { watchGetLiquidSnippets } from './watchGetLiquidSnippets';
import { watchCreateLiquidSnippet } from './watchCreateSnippet';
import { watchUpdateLiquidSnippet } from './watchUpdateLiquidSnippet';
import { watchUpdateLiquidSnippetFileName } from './watchUpdateLiquidSnippetFileName';
import { watchDeleteLiquidSnippet } from './watchDeleteSnippet';

export const sagasLiquidSnippets = [
  watchGetLiquidSnippets,
  watchCreateLiquidSnippet,
  watchUpdateLiquidSnippet,
  watchUpdateLiquidSnippetFileName,
  watchDeleteLiquidSnippet,
];
