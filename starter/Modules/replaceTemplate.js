module.exports = (product, temp) => {
  let output = temp
    .replace(/{%IMAGE%}/g, product.image)
    .replace(/{%PRODUCTNAME%}/g, product.productName)
    .replace(/{%QUANTITY%}/g, product.quantity)
    .replace(/{%PRICE%}/g, product.price)
    .replace(/{%ID%}/g, product.id)
    .replace(/{%FROM%}/g, product.from)
    .replace(/{%NUTRIENT%}/g, product.nutrients)
    .replace(/{%DESCRIPTION%}/g, product.description);
  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
};
