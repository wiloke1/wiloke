import TextInput from 'components/TextInput';

export type FileType = 'css' | 'js';

export interface Hit<T extends FileType> {
  objectID: string;
  filename: string;
  fileTyle: T;
  name: string;
  description: string;
  version: string;
}

export interface AlgoliaVendorsSearchProps<T extends FileType> {
  fileType: T;
  onSearch?: (hits: Hit<T>[]) => void;
}

const AlgoliaVendorsSearch = <T extends FileType>({ onSearch, fileType }: AlgoliaVendorsSearchProps<T>) => {
  return (
    <TextInput
      block
      onValueChange={async value => {
        const res = await fetch(
          'https://2qwlvlxzb6-dsn.algolia.net/1/indexes/libraries/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.26.0&x-algolia-application-id=2QWLVLXZB6&x-algolia-api-key=2663c73014d2e4d6d1778cc8ad9fd010',
          {
            method: 'POST',
            body: JSON.stringify({
              params: `query=${value}&hitsPerPage=8&attributesToRetrieve=["fileType","filename","_highlightResult","version","name","description","CodePen_Override_Display_Name","CodePen_Override_URL"]&filters=fileType:${fileType}`,
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
          },
        );
        const data = await res.json();
        onSearch?.(data.hits);
      }}
    />
  );
};

export default AlgoliaVendorsSearch;
