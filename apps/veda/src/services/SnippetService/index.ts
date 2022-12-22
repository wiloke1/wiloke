import * as Atom from './Atom';
import * as User from './User';

import { createSnippet, deleteSnippet, getSnipptes, loadMoreSnippets, updateSnippet, updateSnippetFileName } from './Logic';

export const snippetApis = {
  atom: Atom,
  client: User,
};

export const snippetService = {
  createSnippet,
  deleteSnippet,
  getSnipptes,
  loadMoreSnippets,
  updateSnippet,
  updateSnippetFileName,
};
