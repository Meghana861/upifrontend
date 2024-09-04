import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const book_url='http://localhost:8080/books-process';
const BookList=()=>{
  const[books,setBooks]=useState('');
  const[message,setMessage]=useState('');
  const [selectedBook, setSelectedBook] = useState(null); // State to store the book being updated
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedAuthor, setUpdatedAuthor] = useState('');
  const[updatedPrice,setUpdatedPrice]=useState('')
  const[updatedpubDate,setUpdatedPubDate]=useState('')
  const navigate=useNavigate();
  useEffect(()=>{
    axios.get(book_url)
  .then(
    response=>setBooks(response.data)
  )
  .catch(error=>console.error('Error Fetching books'))
  },[]);

  const handleDelete=(id)=>{
     axios.delete(`${book_url}/${id}`)
     .then(
      response=>{
        setMessage('Deleted successfully')
        setBooks(books.filter(book=>book.id!==id))
      }
     )
     .catch(error=>console.error('Error Deleting'))
     setMessage('Failed to delete')
  }

  const handleUpdateClick=(book)=>{
    setSelectedBook(book) //sets the selectedbook state to the book that we click
    setUpdatedTitle(book.title)//sets the current book details and appears as a form
    setUpdatedAuthor(book.author)
    setUpdatedPrice(book.price)
    setUpdatedPubDate(book.pubDate)
  }
  const handleUpdateSubmit=(e)=>{
e.preventDefault();
const updatedBook={
  ...selectedBook,//The updatedBook object is created using the spread operator ...selectedBook. This copies all properties from the selectedBook into updatedBook.
  title:updatedTitle,//the updated properties  are overwritten with the new values from the form:
  author:updatedAuthor,
  price:updatedPrice,
  pubDate:updatedpubDate
  }
  axios.put(`${book_url}/${selectedBook.id}`,updatedBook)
  .then(response=>{
    setBooks(books.map(book=>
  book.id===selectedBook.id?updatedBook:book)
    )
    setMessage("Updated Books Successfully")
  })
  }

  const handlePlaceOrder=()=>{
    navigate('/placeOrder')
  }

  let content;
   if(books.length===0){
    content=<p>No Books Available</p>;
}
else{
    content=(
    <ul>
      {books.map(book=>(
        <li key={book.id}>
          <strong>{book.title}</strong> by <bold> {book.author}</bold>
          <button onClick={()=>handleDelete(book.id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
          <button onClick={()=>handleUpdateClick(book)} style={{ marginLeft: '10px', color: 'green' }}>Update</button>
          
        </li>
      ))}
    </ul>
    )
}
  return (
    <div>
       <h2> List of Books</h2>
        {content}
        {selectedBook && (
          <div>
            <h3>Update Book</h3>
            <form onSubmit={handleUpdateSubmit}>
              <label>Title</label>
              <div>
              <input type="text" value={updatedTitle} onChange={(e)=>setUpdatedTitle(e.target.value)}/>
        </div>
        <div>
            <label>Author</label>
            <input type="text" value={updatedAuthor} onChange={(e)=>setUpdatedAuthor(e.target.value)}/>
        </div>
        <div>
            <label>Price</label>
            <input type="text" value={updatedPrice} onChange={(e)=>setUpdatedPrice(e.target.value)}/>
        </div>
        <div>
            <label>PubDate</label>
            <input type="text" value={updatedpubDate} onChange={(e)=>setUpdatedPubDate(e.target.value)}/>
        </div>
       <button type="submit">Update Book</button>
            </form>
            </div>
        )}
        {message && <p>{message}</p>}
        <button onClick={handlePlaceOrder} style={{ marginLeft: '10px', color: 'pink' }}>Place Order</button>
    </div>
  )

}
export default BookList;