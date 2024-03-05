/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useParams } from 'react-router-dom';

const SingleBook = ({ books })=> {
  const params = useParams();
  const id = +params.id;
  const book = books.find(book => book.id === id);
  if(!book){
    return null;
  }
  return (
    <div>
      <h2>{ book.title }</h2>
    </div>
  );
};

export default SingleBook;
