let myLibrary = [];
const bookList = document.querySelector(".book-list");
const submitButton = document.querySelector("#submit-book");
const clearButton = document.querySelector(".clear");
const booksRead = document.querySelector("#books-read");
const booksUnread = document.querySelector("#books-unread");
const booksTotal = document.querySelector("#books-total");

window.addEventListener("load", displayBookStats)

submitButton.addEventListener("click", () => {
    // let form = document.getElementById('book-form').elements["title"].value;
    // console.log(form);
    // let title = document.getElementById('title').value;
    // let author = document.getElementById('author').value;
    // let pages = document.getElementById('pages').value;
    // let read = document.getElementById('read').checked;

    let title = document.getElementById('book-form').elements["title"].value;
    let author = document.getElementById('book-form').elements["author"].value;
    let pages = document.getElementById('book-form').elements["pages"].value;
    let read = document.getElementById('book-form').elements["read"].checked;
    console.log(read);

    addBookToLibrary(title, author, pages, read);
    displayBooks();
    displayBookStats();

    document.getElementById("book-form").reset();
});

clearButton.addEventListener("click", clearList);

// Functions
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, is ${pages}, ${read}`;
    }

}

function addBookToLibrary(title, author, pages, read) {

    if (title === "" || author === "" || pages === "") {
        return;
    }

    let book = new Book(title, author, pages, read);
    return myLibrary.push(book);
}

function displayBooks() {

    // This clears the list of books currently on the page if there is a list. If not included, it will copy the whole current list of books
    // and append it to the end of the list with the new entry. Here is what would happen if this code is not included.
    // ex: cirrentList => book1, book2, book3
    // currentList (adding book4) => book1, book2, book3, book1, book2, book3, book4
    if (bookList.hasChildNodes) {
        while (bookList.lastElementChild) {
            bookList.removeChild(bookList.lastElementChild);
        }
    }

    for (let i = 0; i < myLibrary.length; i++) {
        const addBooksToList = document.createElement("tr");

        let title = document.createElement("td");
        let author = document.createElement("td");
        let pages = document.createElement("td");
        let read = document.createElement("td");
        let remove = document.createElement("td");
        let button = document.createElement("button");
        let hasRead = myLibrary[i].read;
        let statusButton = document.createElement("button");

        title.textContent = myLibrary[i].title;
        author.textContent = myLibrary[i].author;
        pages.textContent = myLibrary[i].pages;
        read.appendChild(statusButton);

        readStatus(hasRead, statusButton);

        remove.appendChild(button);

        // button.classList.add("fa-trash-o");
        // button.classList.add("fa");
        // button.classList.add("trash-btn");

        button.classList.add("fa");
        button.classList.add("fa-trash");
        button.classList.add("trash-btn");

        addBooksToList.appendChild(title);
        addBooksToList.appendChild(author);
        addBooksToList.appendChild(pages);
        addBooksToList.appendChild(read);
        addBooksToList.appendChild(remove);

        addBooksToList.setAttribute("data-entry", i);

        // Attach an event listener to each button as it is created to be able to remove it from the array
        // by clicking the red trash icon
        button.addEventListener("click", () => {
            let index = button.parentElement.parentElement.dataset.entry;
            removeBook(index);

            // Need to make a callback to displayBooks() and displayBookStats() in order to update the array and stats
            // as the button is clicked.
            displayBookStats();
            displayBooks();
        });

        read.addEventListener("click", () => {
            if (hasRead === true) {
                myLibrary[i].read = false;
                readStatus(myLibrary[i].read, statusButton);
            }
            if (hasRead === false) {
                myLibrary[i].read = true;
                readStatus(myLibrary[i].read, statusButton);
            }
            displayBooks();
            displayBookStats();
        });

        bookList.appendChild(addBooksToList);
    }
}

function clearList() {
    myLibrary = [];
    displayBookStats();
    displayBooks();
}

function countReadBooks() {
    let count = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].read === true)
            count++;
    }

    return count;
}

function countUnreadBooks() {
    let count = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].read === false)
            count++;
    }

    return count;
}

function displayBookReadCount() {
    let count = countReadBooks();

    booksRead.innerHTML = "BOOKS READ: " + count;
}

function displayBookUnreadCount() {
    let count = countUnreadBooks();

    booksUnread.innerHTML = "BOOKS UNREAD: " + count;
}

function displayBookTotal() {
    booksTotal.innerHTML = "TOTAL: " + myLibrary.length;
}

function removeBook(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    return myLibrary;
}

function addRemoveButton(removeButton) {
    removeButton.forEach(remove => remove.addEventListener("click", () => {
        let index = remove.parentElement.parentElement.dataset.entry;
        console.log(remove.parentElement.parentElement.dataset.entry);
        removeBook(index);
        displayBooks();
        displayBookStats();
    }));
    console.log(removeButton);
}

function readStatus(status, statusButton) {
    if (status === true) {
        statusButton.classList.remove(...statusButton.classList);

        statusButton.classList.add("fa-check");
        statusButton.classList.add("fa");
        statusButton.classList.add("status-btn");
    }

    if (status === false) {
        statusButton.classList.remove(...statusButton.classList);

        statusButton.classList.add("fa-times");
        statusButton.classList.add("fa");
        statusButton.classList.add("x-btn");
    }
}

function displayBookStats() {
    displayBookReadCount();
    displayBookUnreadCount();
    displayBookTotal();
}