
document.querySelector('#name').addEventListener('blur',(e)=>{

  const inp = document.querySelector('#name');
  const str = /^[a-zA-Z]{2,10}$/;
  if(str.test(inp.value)){
    inp.classList.remove('is-invalid');
  }
  else{
    inp.classList.add('is-invalid');
  }
  console.log(inp.value);

});

document.querySelector('#email').addEventListener('blur',(e)=>{

  const inp = document.querySelector('#email');
  const str = /^[A-Za-z0-9_]+@[A-Za-z]+\.[a-zA-Z]{2,5}$/;
  if(str.test(inp.value)){
    inp.classList.remove('is-invalid');
    console.log('yes');
  }
  else{
    inp.classList.add('is-invalid');
  }
  console.log(inp.value);

});

document.querySelector('#zip').addEventListener('blur',(e)=>{

  const inp = document.querySelector('#zip');
  const str = /^[0-9]{5}(\-[0-9]{4})?$/;
  if(str.test(inp.value)){
    inp.classList.remove('is-invalid');
    //console.log('yes');
  }
  else{
    inp.classList.add('is-invalid');
  }
  console.log(inp.value);

});

document.querySelector('#phone').addEventListener('blur',(e)=>{

  const inp = document.querySelector('#phone');
  const str = /[0-9]{7,10}/;
  if(str.test(inp.value)){
    inp.classList.remove('is-invalid');
    console.log('yes');
  }
  else{
    inp.classList.add('is-invalid');
  }
  console.log(inp.value);

});