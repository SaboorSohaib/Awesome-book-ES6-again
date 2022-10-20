/* eslint-disable no-unused-vars */
import Book from './modules/book-class.js';
import pageNavbar from './modules/navbar.js';
import { clearFields } from './modules/clear-fields.js';
import { DateTime } from './modules/luxon.min.js';

if (localStorage.getItem('My Books') === null) {
  localStorage.setItem('My Books', JSON.stringify([]));
}

const Localstoragebook = JSON.parse(localStorage.getItem('My Books'));

const updateLocalStorage = () => {
  localStorage.setItem('My Books', JSON.stringify(Localstoragebook));
};

const removeBook = (i) => {
  Localstoragebook.splice(i, 1);
  localStorage.setItem('My Books', JSON.stringify(Localstoragebook));
  clearFields();
};

const createListOfBooks = (arr) => {
  const ul = document.createElement('ul');
  ul.classList.add('book-ul');

  arr.forEach((item, index) => {
    const li = document.createElement('li');
    const liClass = index % 2 === 0 ? 'book-li' : 'dark-bakcground';
    li.classList.add(liClass);
    li.innerText = `${item.title} by ${item.author}`;

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerText = 'Remove';
    removeBtn.addEventListener('click', () => {
      Localstoragebook.splice(index, 1);
      localStorage.setItem('My Books', JSON.stringify(Localstoragebook));
      clearFields();
      document.location.reload();
    });

    li.append(removeBtn);
    ul.append(li);
  });

  return ul;
};

const showBooks = () => {
  const listOfBooks = document.querySelector('.container');

  const ul = createListOfBooks(Localstoragebook);
  listOfBooks.innerHTML = '';
  listOfBooks.append(ul);
};

const addNewBook = (bookTitle, bookAuthor) => {
  const myBook = new Book(bookTitle, bookAuthor);
  Localstoragebook.push(myBook);
  updateLocalStorage();
  showBooks();
  clearFields();
};

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  const title = document.querySelector('.book-title');
  const author = document.querySelector('.author-name');
  e.preventDefault();
  addNewBook(title.value, author.value);
});

window.onload = showBooks();

// ======== NAVIGATIONS =================

// ==== Luxon Date ====
const date = document.querySelector('.our-date');
const updateTime = () => {
  const now = DateTime.now();
  date.innerHTML = now.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS);
};
setInterval(updateTime, 1000);

pageNavbar();