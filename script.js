const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const finalAmountElement = document.querySelector('.finalAmount');
const converterContainer = document.querySelector('.converter-container');


const countries = [
    {code: "USD" , name: "United States Dollar"},
    {code: "INR" , name: "Indian Rupee"},
    {code: "AUD" , name: "Australian Dollar"},
    {code: "BRL" , name: "Brazilian real"},
    {code: "CAD" , name: "Canadian dollar"},
    {code: "EUR" , name: "Euro"},
    {code: "BHD" , name: "Bahraini Dinar"},
    {code: "ARS" , name: "Argentine Peso"},
    {code: "CNY" , name: "Yuan Renminbi"},
    {code: "COP" , name: "Colombian Peso"},
    {code: "HKD" , name: "Hong Kong Dollar"},
    {code: "IDR" , name: "Rupiah"},
    {code: "IQD" , name: "Iraqi Dinar"}
    
    
];

countries.forEach(country => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.value = option2.value = country.code;
    option1.textContent = option2.textContent = `${country.code} (${country.name})`;

    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);

    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "INR";

});

const getExchangeRate =   async() =>{
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency =toCurrencyElement.value;

    finalAmountElement.textContent = "Fetching Exchange Rates.....";

    try{

    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data =  await response.json();

   const conversionRate = data.rates[toCurrency];
   const convertedAmount = (amount * conversionRate).toFixed(2);

   if(typeof conversionRate === 'undefined'){
    finalAmountElement.textContent = "Exchange rate data is not available for selected countries!!!";
    convertedAmountElement = "";
   }

   else{
    convertedAmountElement.value = convertedAmount;
   finalAmountElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`

   }
}
catch (error) {
    converterContainer.innerHTML =` <h2>Error while fetching exchange rates!!</h2>`;
  }
}

fromAmountElement.addEventListener('input', getExchangeRate);

fromCurrencyElement.addEventListener('change', getExchangeRate);

toCurrencyElement.addEventListener('change', getExchangeRate);

window.addEventListener('load', getExchangeRate);