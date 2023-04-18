export function Storage() {
    //We encapsulate all the functionalities within the same function to better manage it
    const myStorage = [];
  
    function addTask(task) {
      myLibrary.push(book);
    }
  
    function removeBook(book) {
      const index = myLibrary.indexOf(book);
      if (index !== -1) {
        myLibrary.splice(index, 1);
      }
    }
  
    function toggleReadStatus(book) {
      book.isRead = !book.isRead;
    }
  
    function getBooks() {
      return myLibrary.slice(); // return a copy of the array to avoid direct access to the original array
    }
  
    function clearLibrary() {
      myLibrary.length = 0;
    }
  
    return {
      addBook,
      removeBook,
      toggleReadStatus,
      getBooks,
      clearLibrary,
    };
  }