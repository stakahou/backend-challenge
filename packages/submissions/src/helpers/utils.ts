export const copyObjectAsMutable = <T = {}>(obj: T) =>
  JSON.parse(JSON.stringify(obj)) as T;
