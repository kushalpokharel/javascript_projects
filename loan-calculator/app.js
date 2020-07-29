const calculatebtn = document.querySelector('#loan-form');

//console.log(calculatebtn);

calculatebtn.addEventListener('submit',function(e){

  document.querySelector('.results').style.display = 'none';

  document.querySelector('.loading').style.display = 'block';

  setTimeout(calculateResults,2000);

  e.preventDefault();
});

function calculateResults(){

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPay = document.getElementById('monthly-payment');
  const totalPay = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');


  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100/12;
  const calculatedPayements = parseFloat(years.value)*12;

  const x = Math.pow(1+calculatedInterest,calculatedPayements);
  const amt = x*principal;
  
  const monthly = amt/parseFloat(years.value)/12;
  //console.log(monthly);
  if(!isFinite(monthly))
  {
    showError('Please check your numbers');
    document.querySelector('.loading').style.display = 'none';
    return;
  }
  monthlyPay.value = monthly.toFixed(2);
  totalPay.value = amt.toFixed(2);
  totalInterest.value = (amt-principal).toFixed(2);

  document.querySelector('.results').style.display = 'block';

  document.querySelector('.loading').style.display = 'none';

  // e.preventDefault();
}

function showError(error)
{
  const card = document.querySelector('.card');
  const heading  = document.querySelector('.heading')

  const errorDiv = document.createElement('div');

  errorDiv.className = 'alert alert-danger';

  errorDiv.appendChild(document.createTextNode(error));

  card.insertBefore(errorDiv, heading);

  //clear error after 3 seconds
  setTimeout(clearError,3000);
}

function clearError()
{
  document.querySelector('.alert').remove();
}
