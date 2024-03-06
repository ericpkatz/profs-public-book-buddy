import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import bookLogo from './assets/books.png'
import Books from './components/Books';
import Login from './components/Login';
import Register from './components/Register';
import SingleBook from './Components/SingleBook';
import Account from './Components/Account';

function App() {
  const [books, setBooks] = useState([]);
  const [auth, setAuth] = useState({});
  const [reservations, setReservations] = useState([]);

  useEffect(()=> {
    const attemptLoginWithToken = async()=> {
      const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const json = await response.json();
      if(response.ok){
        setAuth(json);
      }
    };
    const token = window.localStorage.getItem('token');
    if(token){
      attemptLoginWithToken();
    }
  }, []);

  const fetchReservations = async()=> {
    const token = window.localStorage.getItem('token');
    const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const json = await response.json();
    setReservations(json.reservation);
  };

  const reserve = async(book)=> {
    const token = window.localStorage.getItem('token');
    const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${book.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    fetchReservations();
  };

  useEffect(()=> {
    if(auth.id){
      fetchReservations();
    }
    else {
      setReservations([]);
    }
  }, [auth]);




  const login = async(credentials)=> {
    let response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let json = await response.json();
    if(response.ok){
      const token = json.token;
      window.localStorage.setItem('token', token);
      response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      json = await response.json();
      if(response.ok){
        setAuth(json);
      }
    }
    else {
      console.log(json);
    }
  }

  const register = async(credentials)=> {
    let response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let json = await response.json();
    if(response.ok){
      const token = json.token;
      window.localStorage.setItem('token', token);
      response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      json = await response.json();
      if(response.ok){
        setAuth(json);
      }
    }
    else {
      throw json;
    }
  }

  const logout = ()=> {
    window.localStorage.removeItem('token');
    setAuth({});
  };

  useEffect(()=> {
    const fetchBooks = async()=> {
      const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books');
      const json = await response.json();
      setBooks(json.books);
    };
    fetchBooks();
  }, []);


  return (
    <>
      <h1><img id='logo-image' src={bookLogo}/>Library App</h1>
      <nav>
        <Link to='/books'>Books</Link>
        {
          auth.id ? (
            <Link to='/account'>Account</Link>
          ) : (null)
        }
      </nav>
      {
        auth.id ? (
          <button onClick={ logout }>Welcome {auth.email } (Click to logout)</button>
          ):
          (
            <>
              <Login login={ login }/> 
              <Register register={ register }/> 
            </>
          )
      }
      <Routes>
        <Route path='/books/:id' element={ <SingleBook books={ books }/> } />
        <Route
          path='/books'
          element={
            <Books books={ books } auth={ auth } reservations={reservations} reserve={ reserve }/>
          }
        />
        <Route
          path='/books/search/:term'
          element={
            <Books books={ books } />
          }
        />
        {
          auth.id ? (
            <Route
              path='/account'
              element={
                <Account auth={ auth } />
              }
            />
          ): (null)
        }
      </Routes>

    </>
  )
}

export default App
