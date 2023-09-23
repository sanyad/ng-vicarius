export const GetTypeOf = (data: any) => {
  if (Array.isArray(data)) {
    return data;
  } else {
    const array: any[] = [];
    for (const dataKey in data) {
      const item: any = new Object();
      item.id = +dataKey;
      for (const itemKey in data[dataKey]) {
        item[itemKey] = data[dataKey][itemKey]
      }
      array.push(item);
    }
    return array;
  }
};
