import { Link } from 'react-router-dom';
const Books = ({ books })=> {
  return (
    <ul>
      {
        books.map((book)=> {
          return (
            <li key={ book.id }>
              <Link to={`/books/${book.id}`}>
              { book.title }
              </Link>
            </li>
          );
        })
      }
    </ul>
  );
};

export default Books;
