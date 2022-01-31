console.log("this is project 2");

//constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display constructor
function Display() {

}

//add methods to display prototypes

Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    } else {
        return true;
    }
}

Display.prototype.add = function (book) {
    console.log("adding this book");
    let tableBody = document.getElementById("tableBody");

    let UIstring = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`
    tableBody.innerHTML += UIstring;
}

Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

Display.prototype.show = function (type,displaymessage) {
    let mssg = document.getElementById("message");
    mssg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                        <strong>Message: </strong>${displaymessage}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>`
    setTimeout(function(){
        // mssg.display="none"
        mssg.innerHTML="";
    }, 3000);
}

//add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("You have submitted library form");

    //now we want that whenever you add a book, a new book object is created

    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let type;

    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    // console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show("success","Your book has been successfully added!");

        localStorage.setItem("books",JSON.stringify(book));
    } else {
        //show error to the user
        display.show("error","Sorry, you cannot add this book!");
    }

    // let books= localStorage.getItem("books");
    // if(books==null)
    // {
    //     booksObj=[];
    // }
    // else{
    //     booksObj= JSON.parse(books);
    // }

    // booksObj.push(name.value,author.value,type.value);
   

    e.preventDefault(); //to prevent the defaut behaviour of the form to reload whenever you submit the form
}