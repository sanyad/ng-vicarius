export const GetTypeOf = (data: any) => {
  if (Array.isArray(data)) {
    return data;
  } else {
    return Object.values(data);
  }
};
