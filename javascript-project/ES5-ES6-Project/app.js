//book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI(){}

//Add book to List
UI.prototype.addBookToList = function(book){
    
    const bookList = document.getElementById("book-list");
    
    const row = document.createElement("tr");
    
    //insert cols in row
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">x</a></td>
    `;
   
    bookList.appendChild(row);
}

//clear fields
UI.prototype.clearFields = function(){
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("ISBN").value = "";
}

//show alert
UI.prototype.showAlert = function(message, className){
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    
    //insert alert
    container.insertBefore(div,form);
    
    //Timeout after 3 seconds
    setTimeout(function(){
        document.querySelector(".alert").remove();
    },3000);
}

UI.prototype.deleteBook = function(target){

    if(target.className === "delete"){
        
        target.parentElement.parentElement.remove();
         
    }
}


//event listeners
document.getElementById("book-form").addEventListener("submit", function(e){
    
    const title = document.getElementById("title").value,
          author = document.getElementById("author").value,
          isbn = document.getElementById("ISBN").value
    
    const book = new Book(title, author, isbn);
    const ui = new UI();
    
    //validate
    if(title === "" || author === "" || isbn === ""){
        if(document.querySelector(".alert") === null){
            ui.showAlert("Please fill in all fields", "error");
        }
        
    }else{
        
    //Add book to list
    ui.addBookToList(book);
        
    //show success
    ui.showAlert("Book added!", "success");  
    
    //clear fields
    ui.clearFields();
    }
    

    
    e.preventDefault();
})


document.getElementById("book-list").addEventListener("click",function(e){
    
    const ui = new UI();
    
    ui.deleteBook(e.target);
    
    ui.showAlert("Book removed!","success")
    
    e.preventDefault();
})