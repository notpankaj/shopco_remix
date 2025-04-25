export const query_string_to_obj = (
  queryString: string | URLSearchParams
): object => {
  const params = new URLSearchParams(queryString);
  let obj: any = {};
  for (let data of params.entries()) {
    obj[data[0]] = data[1];
  }
  return obj;
};
