import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Register = ({ register })=> {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async(ev)=> {
    ev.preventDefault();
    const credentials = {
      email,
      password
    };
    try {
      await register(credentials);
      navigate('/account');
    }
    catch(ex){
      setError(ex.message);
    }

  }

  return (
    <form onSubmit={ submit }>
      {
        error ? (
          <div className='error'>{ error }</div>
        ): (null)
      }
      {
        error !== '' &&  (
          <div className='error'>{ error }</div>
        )
      }
      <input
        placeholder='email'
        value={ email }
        onChange={ ev => setEmail(ev.target.value )}
      />
      <input
        placeholder='password'
        value={ password }
        onChange={ ev => setPassword(ev.target.value )}
      />
      <button>Register</button>
    </form>
  );
};

export default Register;
