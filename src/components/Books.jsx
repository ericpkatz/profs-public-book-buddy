import { Link, useParams, useNavigate } from 'react-router-dom';

const Books = ({ books, reservations, reserve, auth })=> {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <>
      <input value={ params.term || '' } onChange={ ev => navigate(ev.target.value ? `/books/search/${ev.target.value}` : '/books')}/>
      <ul>
        {
          books.filter(book => !params.term || book.title.includes(params.term)).map((book)=> {
            const bookReservations = reservations.filter(function(reservation){
              return reservation.title === book.title;
            });

            return (
              <li key={ book.id }>
                <Link to={`/books/${book.id}`}>
                { book.title }
                </Link>
                {
                  auth.id ? (
                    <span>
                      ({ bookReservations.length})
                      <button onClick={()=> reserve(book)}>Reserve</button>
                    </span>
                  ) : (null)
                }
              </li>
            );
          })
        }
      </ul>
    </>
  );
};

export default Books;
