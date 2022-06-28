import React, { useState } from 'react';
import { useRouter } from '../../../../node_modules/next/router';
import axios from '../common/api/axios';
import Button from '../common/components/button';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const tryLogin = async () => {
    if (email !== '' && password !== '') {
      const formData = { email: email, password: password };
      const data = await axios.post('/auth/signin', formData);
      const token = data.data.access_token;

      if (token !== '') {
        localStorage.setItem('accessToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        window.location.href = '/order';
      } else {
        setEmail('');
        setPassword('');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    axios.defaults.headers.common['Authorization'] = '';
  };

  return (
    <div className="login-page">
      <p className="snackify-title">Snackify</p>
      <div className="login-box">
        <p className="login__title">Inloggen</p>
        <p className="login__subtitle">Welkom beste snacker!</p>
        <div className="input__wrapper input__wrapper--margin">
          <label>Email</label>
          <input
            type="text"
            placeholder="v.achternaam@lameco.nl"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="input__wrapper">
          <label>Wachtwoord</label>
          <input
            type="password"
            placeholder="Voer je wachtwoord in"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <p className="login__forgot-password">Wachtwoord vergeten?</p>
        <Button color="black" size="medium" text="Inloggen" fill={true} onClick={tryLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
