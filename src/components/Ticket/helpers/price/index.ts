export function showPrice(price: number): string {
  const tmp = reverseStr(price.toString())
    .match(/.{1,3}/g)
    ?.join(' ');
  return reverseStr(tmp || '');
}

const reverseStr = (str: string) => str.split("").reverse().join("");
