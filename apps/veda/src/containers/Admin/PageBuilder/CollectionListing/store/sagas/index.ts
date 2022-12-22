import { watchCreateCollectionListing } from './watchCreateCollectionListing';
import { watchUpdateStatusCollectionListing } from './watchUpdateStatusCollectionListing';
import { watchDeleteCollectionListing } from './watchDeleteCollectionListing';
import { watchGetCollectionListing } from './watchGetCollectionListing';
import { watchLoadMoreCollectionListing } from './watchLoadMoreCollectionListing';

export const sagasCollectionListing = [
  watchCreateCollectionListing,
  watchUpdateStatusCollectionListing,
  watchDeleteCollectionListing,
  watchGetCollectionListing,
  watchLoadMoreCollectionListing,
];
