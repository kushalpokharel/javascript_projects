 //alert("hey");
 const form = document.getElementById('book-form');
 //console.log(form);

 function Book(tit,auth,isbn){
    this.title = tit;
    this.author = auth;
    this.isbn = isbn;
 }

 function UI(){}

 UI.prototype.addBook=function(book){
    const list = document.querySelector('#book-list');
    const tr  = document.createElement('tr');
    tr.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class ="delete">X</a></td>`; 
    console.log(tr);
    list.appendChild(tr);               
}

UI.prototype.showAlert = function(msg,cla){
  const div = document.createElement('div');
  div.className = `alert ${cla}`;
  div.appendChild(document.createTextNode(msg));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  container.insertBefore(div,form);
}

UI.prototype.disappearAlert = function(){
  const div = document.querySelector('.alert');
  div.remove();
}

UI.prototype.deleteBook=function(target){
  target.parentElement.parentElement.remove();
}

document.querySelector('#book-list').addEventListener('click',function(e){
  console.log(e.target.classList);
  ui =new UI();
  if(e.target.classList.contains('delete'))
  {
    ui.deleteBook(e.target);
    ui.showAlert('Book deleted','success');
  }
  e.preventDefault();
});

form.addEventListener('submit',function(e){
  console.log('yes');
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  const book = new Book(title,author,isbn);
  const ui = new UI();

  if(title===''||author===''||isbn==='')
  {
    ui.showAlert(`Please enter valid inputs`,'error');
    setTimeout(ui.disappearAlert,3000);
    e.preventDefault();
    return;
  }

  ui.addBook(book);
  ui.showAlert(`Book Added`, 'success');
  setTimeout(ui.disappearAlert,3000);

  document.querySelector('#title').value='';
  document.querySelector('#author').value='';
  document.querySelector('#isbn').value='';
  
  e.preventDefault();
});