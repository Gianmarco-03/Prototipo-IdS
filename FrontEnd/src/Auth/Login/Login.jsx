import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import connection from '../AuthService';
import { AuthContext } from '../AuthProvider';
import "./styles/Login.css";


export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const [errore, setErrore] = useState('');
  const [successo, setSuccesso] = useState('');

 useEffect(() => {
    connection.start().catch(console.error);

    connection.on('LoginEsito', (ok, user) => {
      if (ok) {
        setSuccesso('Login completata con successo!');
        login(user);
        console.log("login in di \n" + user);
        navigate('/');
        
      } else {
        setErrore(user || 'Login fallita');
      }
    });

    return () => {
      connection.off('LoginEsito');
      connection.stop();
    };
  }, [onLogin]);
  
  const handleSubmit = async e => {
     e.preventDefault();
    setErrore('');
    setSuccesso('');
    // Send registration data via SignalR
    connection.invoke('Login', form.username, form.password)
      .catch(() => setErrore('Errore di connessione al server'));

  };

  // Aggiorna lo stato form in modo generico
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">Username</label>
        <input
          type="text"
          name="username"
          className="auth-input"
          value={form.username}
          onChange={handleChange}
          required
        />

        <label className="auth-label">Password</label>
        <input
          type="password"
          name="password"
          className="auth-input"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="auth-button" type="submit">Accedi</button>
      </form>

      {errore && <p style={{ color: 'red', marginTop: '1em' }}>{errore}</p>}
      {successo && <p style={{ color: 'lightgreen', marginTop: '1em' }}>{successo}</p>}


      <div className="auth-switch-link">
        Non hai un account?{' '}
        <Link to="/registrazione">Registrati</Link>
      </div>
    </div>
  );
}
