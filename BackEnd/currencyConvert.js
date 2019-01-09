function convertCurrency(amount,currency) {
  if(currency !== gs.getProperty('glide.i18n.single_currency.code')) {
 var currencyConvert = new GlideConverter();
  //gs.addInfoMessage(amount + " | " + currency);
  return parseFloat(currencyConvert.convert(amount, currency, 'USD'));
  } else {
    return parseFloat(amount);
  }
}
