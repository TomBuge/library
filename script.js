let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; 
    this.id = crypto.randomUUID();
}


function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read)
    myLibrary.push(newBook);
}


function displayBooks() {

    const container = document.querySelector('.main');

    container.innerHTML = "";


    for(const item of myLibrary) {
        const card = document.createElement('div'); 
        card.classList.add('card');

        const title = document.createElement('div')
        title.classList.add('title');
        title.textContent = item.title;
        card.appendChild(title);

        const author = document.createElement('div');
        author.classList.add('author');
        author.textContent = item.author;
        card.appendChild(author);

        const pages = document.createElement('div');
        pages.classList.add('pages');
        pages.textContent = `Pages: ${item.pages}`;
        card.appendChild(pages);

        const read = document.createElement('div');
        read.classList.add('read');
        if (item.read) read.textContent = 'Read';
        else read.textContent = 'Not Read';
        card.appendChild(read);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        deleteButton.textContent = 'Delete';
        card.appendChild(deleteButton);

        card.dataset.number = item.id;
        console.log(card.dataset.number);



        document.querySelector('.main').appendChild(card);

    }
}

const addBookButton = document.getElementById("addBook");
const dialog = document.querySelector("dialog");
addBookButton.addEventListener("click", () => {
    dialog.showModal();
})

const cancelButton = document.getElementById('cancelButton');
cancelButton.addEventListener('click', () => {
    dialog.close();
})

const form = document.querySelector('.book-form');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const titleValue = document.getElementById('title').value;
    const authorValue = document.getElementById('author').value;
    const pageValue = document.getElementById('pages').value;
    const readStatus = document.querySelector('input[name="read"]:checked')?.value;
    console.log(readStatus);
    const readValue = (readStatus === "true");


    addBookToLibrary(titleValue, authorValue, pageValue, readValue);
    displayBooks();
    dialog.close();

})


addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('Ulysses', 'James Joyce', 900, false)
addBookToLibrary('The Sovereign Individual', 'James Dale Davidson and Lord William Rees-Mogg', 445, true);

displayBooks();

const container = document.querySelector('.main');
container.addEventListener('click', function(e) {
    
    if (e.target.classList.contains('deleteButton')) {
        const parentCard = e.target.closest('.card');
        const idToRemove = parentCard.dataset.number;
        myLibrary = myLibrary.filter(book => book.id !== idToRemove);
        displayBooks();
    }
});