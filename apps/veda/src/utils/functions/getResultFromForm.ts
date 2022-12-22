const getResultFromForm = <T extends { name: string; value: any }>(arr: T[]) => {
  return arr.reduce<T>((obj, field) => {
    return {
      ...obj,
      [field.name]: field.value,
    };
  }, {} as any);
};

export default getResultFromForm;
