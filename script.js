let library = [];

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = () => {
    return `${this.title}, ${this.author}, ${this.pages}, ${
      this.read ? "read" : "not read yet"
    }`;
  };
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, status = false) {
  const addBook = new Book(title, author, pages, status);
  library.push(addBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "300", true);
addBookToLibrary("Dune", "Frank Herbert", "600", false);
addBookToLibrary("Brave New World", "Aldous Huxley", "288", true);
addBookToLibrary("Blood Meridian", "Cormac McCarthy", "368", false);

const bookGrid = document.getElementById("book-grid");

function renderBooks(arr) {
  function newEle(tag, text = "", className = undefined) {
    const ele = document.createElement(tag);
    className && ele.classList.add(className);
    ele.textContent = text;
    return ele;
  }
  arr.forEach((element) => {
    const book = newEle("div", "", "bookcard");
    const head = newEle("h1", element.title);
    const auth = newEle("p", element.author);
    const page = newEle("p", element.pages);
    const interact = newEle("div", "", "interact");
    const read = newEle("button", "Finished", "status");
    const remove = newEle("button", "Remove", "remove");

    interact.append(read, remove);
    book.append(head, auth, page, interact);
    bookGrid.appendChild(book);
  });
}

renderBooks(library);

const submit = document.querySelector(".addBook");
const dialog = document.querySelector(".book-form");

submit.addEventListener("click", () => {
  dialog.showModal();
});
