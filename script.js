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

const bookGrid = document.getElementById("book-grid");

function addBookToLibrary(title, author, pages, status = false) {
  const addBook = new Book(title, author, pages, status);
  library.push(addBook);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "300", true);
addBookToLibrary("Dune", "Frank Herbert", "600", false);
addBookToLibrary("Brave New World", "Aldous Huxley", "288", true);
addBookToLibrary("Blood Meridian", "Cormac McCarthy", "368", false);

function render(element) {
  function newEle(tag, text = "", className = undefined) {
    const ele = document.createElement(tag);
    className && ele.classList.add(className);
    ele.textContent = text;
    return ele;
  }
  const book = newEle("div", "", "bookcard");
  const head = newEle("h1", element.title);
  const auth = newEle("p", element.author);
  const page = newEle("p", element.pages);
  const interact = newEle("div", "", "interact");
  const readStatus = element.read ? "Finished" : "Not Finished";
  const readState = readStatus == "Finished" ? "status" : "status-not";
  const read = newEle("button", readStatus, readState);
  const remove = newEle("button", "Remove", "remove");

  interact.append(read, remove);
  book.append(head, auth, page, interact);
  book.dataset.id = element.id;

  remove.addEventListener("click", () => {
    const toRemove = document.querySelector(`[data-id="${element.id}"]`);
    const bookIndex = library.findIndex((item) => item.id === element.id);
    library.splice(bookIndex, 1);
    toRemove.remove();
  });

  read.addEventListener("click", () => {
    element.read = !element.read;
    if (element.read) {
      read.textContent = "Finished";
      read.classList.replace("status-not", "status");
    } else {
      read.textContent = "Not Finished";
      read.classList.replace("status", "status-not");
    }
  });
  bookGrid.appendChild(book);
}

function renderBooks(arr) {
  arr.forEach(render);
}

renderBooks(library);

const newEntry = document.querySelector(".addBook");
const dialog = document.querySelector(".dialog-form");

newEntry.addEventListener("click", () => {
  dialog.showModal();
});

const submit = document.querySelector(".submit-book");

submit.addEventListener("click", (e) => {
  const form = document.forms["book-form"];
  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();
    return;
  }

  const title = form["title"].value;
  const author = form["author"].value;
  const pages = form["count"].value;
  const status = form["status"].checked;
  addBookToLibrary(title, author, pages, status);

  const latestBook = library[library.length - 1];
  render(latestBook);
});
