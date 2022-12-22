import { useEffect, useState } from 'react';
import { SectionSettings } from 'types/Schema';

const domParser = new DOMParser();

export const useGetClassNames = (tabValue: string, html: string, settings: SectionSettings) => {
  const [classNames, setClassNames] = useState<string[]>([]);

  useEffect(() => {
    if (!['scss', 'js'].includes(tabValue)) {
      return;
    }
    try {
      const doc = domParser.parseFromString(html, 'text/html');
      const els = Array.from(doc.querySelectorAll('body *'));
      const classNames = els.flatMap(el => Array.from(el.classList)).filter(item => !!item && item.replace(/[\w-]*/g, '') === '');
      setClassNames(Array.from(new Set(classNames)));
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, settings, tabValue]);

  return classNames;
};

export const useGetClassNamesFromScss = (tabValue: string, scss: string) => {
  const [classNames, setClassNames] = useState<string[]>([]);

  useEffect(() => {
    try {
      const arrClassNames = scss.replace(/\{/g, '{/n').match(/\..*(?=\{)/g) ?? [];
      if (!!arrClassNames) {
        const classNames = arrClassNames.flatMap(item => {
          return item
            .replace(/\s+/g, ' ')
            .replace(/(^\.)|(\s*$)/g, '')
            .split(' .');
        });
        setClassNames(Array.from(new Set(classNames)));
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scss, tabValue]);

  return classNames;
};
