import { Link, useParams, useNavigate } from 'react-router-dom';

const Books = ({ books })=> {
  const params = useParams();
  const navigate = useNavigate();
  console.log(navigate);
  return (
    <>
      <input value={ params.term || '' } onChange={ ev => navigate(ev.target.value ? `/books/search/${ev.target.value}` : '/books')}/>
      <ul>
        {
          books.filter(book => !params.term || book.title.includes(params.term)).map((book)=> {
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
    </>
  );
};

export default Books;
