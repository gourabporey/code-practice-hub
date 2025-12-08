export function skipLast<Type>(list: Type[]): Type[] {
  return list.slice(0, -1);
}
