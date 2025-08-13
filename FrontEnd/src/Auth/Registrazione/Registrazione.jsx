import React, { useState, useEffect } from 'react';
import { register as registerUser, onRegistrazioneEsito, offRegistrazioneEsito, disconnect } from '../../service/AuthService';

const Registrazione = ({ onRegistrazioneSuccess }) => {
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Nome: '',
    Email: '',
    DataDiNascita: ''
  });

  const [errore, setErrore] = useState('');
  const [successo, setSuccesso] = useState('');

 useEffect(() => {
    const handler = (ok, message) => {
      if (ok) {
        setSuccesso(message || 'Registrazione completata con successo!');
        onRegistrazioneSuccess?.();
      } else {
        setErrore(message || 'Registrazione fallita');
      }
    };

    onRegistrazioneEsito(handler);

    return () => {
      offRegistrazioneEsito(handler);
      disconnect();
    };
  }, [onRegistrazioneSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrore('');
    setSuccesso('');
    try {
      await registerUser(formData);
    } catch {
      setErrore('Errore di connessione al server');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Registrati</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label className="auth-label">Username</label>
        <input className="auth-input" type="text" name="Username" required value={formData.Username} onChange={handleChange} />

        <label className="auth-label">Password</label>
        <input className="auth-input" type="password" name="Password" required value={formData.Password} onChange={handleChange} />

        <label className="auth-label">Nome</label>
        <input className="auth-input" type="text" name="Nome" required value={formData.Nome} onChange={handleChange} />

        <label className="auth-label">Email</label>
        <input className="auth-input" type="email" name="Email" required value={formData.Email} onChange={handleChange} />

        <label className="auth-label">Data di nascita</label>
        <input className="auth-input" type="date" name="DataDiNascita" required value={formData.DataDiNascita} onChange={handleChange} />

        <button type="submit" className="auth-button">Registrati</button>
      </form>

      {errore && <p style={{ color: 'red', marginTop: '1em' }}>{errore}</p>}
      {successo && <p style={{ color: 'lightgreen', marginTop: '1em' }}>{successo}</p>}

      <div className="auth-switch-link">
        Hai già un account? <a href="/login">Accedi</a>
      </div>
    </div>
  );
};

export default Registrazione;
