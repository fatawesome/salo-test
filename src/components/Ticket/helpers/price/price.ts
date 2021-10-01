export function showPrice(price: number): string {
  let result = ' Р';
  while (price) {
    result = ' ' + (price % 1000) + result;
    price = Math.floor(price / 1000);
  }
  return result.trimLeft();
}
