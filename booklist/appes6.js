class Book{
  constructor(title,author,isbn){
    this.title=title;
    this.author= author;
    this.isbn = isbn;
  }
}

class UI{
  addBook(book){
    const list = document.querySelector('#book-list');
    const tr  = document.createElement('tr');
    tr.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class ="delete">X</a></td>`; 
    //console.log(tr);
    list.appendChild(tr);  
  }
  deleteBook(target){
    target.parentElement.parentElement.remove();
  }
  showAlert(msg,cla){
    const div = document.createElement('div');
    div.className = `alert ${cla}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div,form);
  }
  clearFields(){
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';
  }
  disappearAlert(){
    const div = document.querySelector('.alert');
    //console.log(div);
    div.remove();
  }
}

//local storage class
class Store{
  static displayBooks(){
    const books = Store.getBooks();
    const list = document.querySelector('#book-list');
    books.forEach(function(book){
      const ui = new UI;
      ui.addBook(book);
    }) 
  }
  
  static getBooks(){
    let books;
    //console.log(books);
    if(localStorage.getItem('books') === null){
      books = [];
    }
    else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  
  static addBook(book){
    const books = Store.getBooks();
    console.log(books);
    books.push(book);

    localStorage.setItem('books',JSON.stringify(books));
  }
  
  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach(function(book,ind){
      if(book.isbn===isbn)
      {
        books.splice(ind,1);
      }
    });
    localStorage.setItem('books',JSON.stringify(books))
  }
}

document.addEventListener('DOMContentLoaded',Store.displayBooks);

document.querySelector('#book-form').addEventListener('submit',function(e){
 // console.log('yes');
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
  //add to the local storage
  Store.addBook(book);
  
  ui.showAlert(`Book Added`, 'success');
  setTimeout(ui.disappearAlert,3000);

  ui.clearFields();

  
  e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click',function(e){
  //console.log(e.target.classList);
  ui =new UI();
  if(e.target.classList.contains('delete'))
  {
    ui.deleteBook(e.target);
    ui.showAlert('Book deleted','success');
    //console.log(e.target.parentElement.previousElementSibling.textContent);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    setTimeout(ui.disappearAlert,3000);
  }
  e.preventDefault();
});