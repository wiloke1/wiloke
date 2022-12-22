import { useSectionActive } from 'hooks/useSectionActive';
import { ReactNode, useMemo } from 'react';
import { View } from 'wiloke-react-core';
import { SettingMappingType } from '../types';
import { convertToSyntaxDataType, isExistExactKeyword, replaceExactKeyword } from './utils';

interface Props {
  setting: Parameters<SettingMappingType[keyof SettingMappingType]>[0];
  children: ReactNode;
  arrayIndex: number | null;
}

/** Component check dependencies để hiển thị ra field settings */
const FieldDepsWrapper = ({ setting, children, arrayIndex, ...rest }: Props) => {
  const sectionActive = useSectionActive();

  // const ok: boolean = useMemo(() => {
  //   /**
  //    * Input:
  //       general_settings.background_type === "color"
  //       general_settings.background_type === "image"
  //       general_settings.background_overlay_enable === true

  //       giá trị general_settings trong "settings" được đổ vào twig = {
  //         background_type: 'color',
  //         background_color: '#fff',
  //         background_image: "",
  //         background_fixed: true,
  //         background_size: "cover",
  //         background_overlay_enable: true,
  //         background_overlay_color: "rgba(15,15,54,0)",
  //         padding: {
  //           left: 0
  //         }
  //       }
  //     * Output:
  //       "color" === "color"
  //       "color" === "image"
  //       true === true

  //    */
  //   try {
  //     if (setting.deps && sectionActive) {
  //       let compareClauseAfterBlockObjectAndSettings = setting.deps;
  //       sectionActive.data.settings.forEach(item => {
  //         if (item.type !== 'object' && item.type !== 'array') {
  //           if (typeof item.children === 'string') {
  //             compareClauseAfterBlockObjectAndSettings = replaceExactKeyword(
  //               compareClauseAfterBlockObjectAndSettings,
  //               item.name,
  //               `"${item.children}"`,
  //             );
  //           } else {
  //             compareClauseAfterBlockObjectAndSettings = replaceExactKeyword(compareClauseAfterBlockObjectAndSettings, item.name, item.children);
  //           }
  //         }
  //         if (item.type === 'object') {
  //           item.children.forEach(childOfItem => {
  //             if (typeof childOfItem.children === 'string') {
  //               compareClauseAfterBlockObjectAndSettings = replaceExactKeyword(
  //                 compareClauseAfterBlockObjectAndSettings,
  //                 `${item.name}.${childOfItem.name}`,
  //                 `"${childOfItem.children}"`,
  //               );
  //             } else {
  //               compareClauseAfterBlockObjectAndSettings = replaceExactKeyword(
  //                 compareClauseAfterBlockObjectAndSettings,
  //                 `${item.name}.${childOfItem.name}`,
  //                 childOfItem.children,
  //               );
  //             }
  //           });
  //         }
  //       });

  //       let compareClauseAfterBlockArray = compareClauseAfterBlockObjectAndSettings;
  //       const atomCompareClausesAfterBlockArray: string[] = [];
  //       // Lặp qua các field "array" để đảm bảo "array" luôn được thế cuối cùng vì cần phải thế giá trị vào để set
  //       sectionActive.data.settings.forEach(item => {
  //         if (item.type === 'array') {
  //           const compareClausesAfterBlockItem: string[] = [];
  //           item.children.forEach(arrayItem => {
  //             arrayItem.children.forEach(fieldOfArrayItem => {
  //               const variableClause = `${item.name}.${fieldOfArrayItem.name}`;
  //               if (isExistExactKeyword(compareClauseAfterBlockArray, variableClause)) {
  //                 if (typeof fieldOfArrayItem.children === 'string') {
  //                   const compareClauseOfArrayItem_ = replaceExactKeyword(
  //                     compareClauseAfterBlockArray,
  //                     variableClause,
  //                     `"${fieldOfArrayItem.children}"`,
  //                   );
  //                   compareClausesAfterBlockItem.push(`(${compareClauseOfArrayItem_})`);
  //                 } else {
  //                   const compareClauseOfArrayItem_ = replaceExactKeyword(
  //                     compareClauseAfterBlockArray,
  //                     `${item.name}.${fieldOfArrayItem.name}`,
  //                     `${fieldOfArrayItem.children}`,
  //                   );
  //                   compareClausesAfterBlockItem.push(`(${compareClauseOfArrayItem_})`);
  //                 }
  //               }
  //             });
  //           });
  //           if (compareClausesAfterBlockItem.length) {
  //             atomCompareClausesAfterBlockArray.push(`(${compareClausesAfterBlockItem.join('||')})`);
  //             compareClauseAfterBlockArray = atomCompareClausesAfterBlockArray.join('||');
  //           }
  //         }
  //       });

  //       // Cuối cùng thêm mệnh đề so sánh sau xử lý các field !== "array" để đúng logic nếu không có field "array" nào
  //       atomCompareClausesAfterBlockArray.unshift(compareClauseAfterBlockObjectAndSettings);
  //       const finalCompareClause = at(atomCompareClausesAfterBlockArray, -1);
  //       if (finalCompareClause) {
  //         const function_ = new Function(`return ${finalCompareClause}`);
  //         const result: boolean = function_();
  //         return result;
  //       } else {
  //         throw new Error('Có lỗi trong quá trình xử lý dependencies của field');
  //       }
  //     }
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     return true;
  //   }
  // }, [sectionActive, setting.deps]);

  const ok: boolean = useMemo(() => {
    /**
     * Input:
        general_settings.background_type === "color"
        general_settings.background_type === "image"
        general_settings.background_overlay_enable === true

        giá trị general_settings trong "settings" được đổ vào twig = {
          background_type: 'color',
          background_color: '#fff',
          background_image: "",
          background_fixed: true,
          background_size: "cover",
          background_overlay_enable: true,
          background_overlay_color: "rgba(15,15,54,0)",
          padding: {
            left: 0
          }
        }
      * Output:
        "color" === "color"
        "color" === "image"
        true === true

     */
    try {
      if (setting.deps && sectionActive) {
        const deps_ = setting.deps;
        let compareClause = deps_;
        sectionActive.data.settings.forEach(item => {
          // Fix cho field "divider" vì "divider có name='' nên replace chạy liên tục dẫn đến sai"
          if (item.name !== '') {
            if (item.type !== 'object' && item.type !== 'array') {
              if (typeof item.children === 'string' || typeof item.children === 'number' || typeof item.children === 'boolean') {
                compareClause = replaceExactKeyword(compareClause, item.name, convertToSyntaxDataType(item.children));
              }
              if (typeof item.children === 'object' && !Array.isArray(item.children)) {
                Object.entries(item.children).forEach(([key, valueOfKey]) => {
                  if (typeof valueOfKey === 'string' || typeof valueOfKey === 'number' || typeof valueOfKey === 'boolean') {
                    compareClause = replaceExactKeyword(compareClause, `${item.name}.${key}`, convertToSyntaxDataType(valueOfKey));
                  }
                });
              }
            } else if (item.type === 'object') {
              item.children.forEach(childOfItem => {
                // Fix cho field "divider" vì "divider có name='' nên replace chạy liên tục dẫn đến sai"
                if (childOfItem.name !== '') {
                  const variableClause = `${item.name}.${childOfItem.name}`;
                  if (
                    typeof childOfItem.children === 'string' ||
                    typeof childOfItem.children === 'number' ||
                    typeof childOfItem.children === 'boolean'
                  ) {
                    compareClause = replaceExactKeyword(compareClause, variableClause, convertToSyntaxDataType(childOfItem.children));
                  }
                  if (typeof childOfItem.children === 'object' && !Array.isArray(childOfItem.children)) {
                    Object.entries(childOfItem.children).forEach(([key, valueOfKey]) => {
                      if (typeof valueOfKey === 'string' || typeof valueOfKey === 'number' || typeof valueOfKey === 'boolean') {
                        compareClause = replaceExactKeyword(compareClause, `${variableClause}.${key}`, convertToSyntaxDataType(valueOfKey));
                      }
                    });
                  }
                }
              });
            } else if (item.type == 'array' && arrayIndex !== null) {
              item.children.forEach((arrayItem, arrayIndex_) => {
                arrayItem.children.forEach(fieldOfArrayItem => {
                  // Fix cho field "divider" vì "divider có name='' nên replace chạy liên tục dẫn đến sai"
                  if (fieldOfArrayItem.name !== '') {
                    const variableClause = `${item.name}.${fieldOfArrayItem.name}`;
                    if (arrayIndex === arrayIndex_ && isExistExactKeyword(deps_, variableClause)) {
                      if (
                        typeof fieldOfArrayItem.children === 'string' ||
                        typeof fieldOfArrayItem.children === 'number' ||
                        typeof fieldOfArrayItem.children === 'boolean'
                      ) {
                        compareClause = replaceExactKeyword(compareClause, variableClause, convertToSyntaxDataType(fieldOfArrayItem.children));
                      }
                      if (typeof fieldOfArrayItem.children === 'object' && !Array.isArray(fieldOfArrayItem.children)) {
                        Object.entries(fieldOfArrayItem.children).forEach(([key, valueOfKey]) => {
                          if (typeof valueOfKey === 'string' || typeof valueOfKey === 'number' || typeof valueOfKey === 'boolean') {
                            compareClause = replaceExactKeyword(compareClause, `${variableClause}.${key}`, convertToSyntaxDataType(valueOfKey));
                          }
                        });
                      }
                    }
                  }
                });
              });
            }
          }
        });
        const function_ = new Function(`return ${compareClause}`);

        const result: boolean = function_();
        return result;
      }
      return true;
    } catch (error) {
      console.log('Deps', error);
      return true;
    }
  }, [arrayIndex, sectionActive, setting.deps]);

  if (!setting.deps || ok) {
    return children as any;
  }
  // ...rest để fix warning của react-beauty-dnd
  if (!sectionActive) {
    return <View {...rest} css={{ display: 'none' }}></View>;
  }
  return <View {...rest} css={{ display: 'none' }}></View>;
};

export default FieldDepsWrapper;
