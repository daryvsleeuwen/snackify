import React, { useState } from 'react';
import { useRouter } from '../../../../node_modules/next/router';
import axios from '../common/api/axios';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const tryLogin = async () => {
    const formData = { email: email, password: password };
    const data = await axios.post('/auth/signin', formData);
    const token = data.data.access_token;

    if (token !== '') {
      localStorage.setItem('accessToken', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      router.push('/order');
    } else {
      setEmail('');
      setPassword('');
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    axios.defaults.headers.common['Authorization'] = '';
  };

  return (
    <div>
      <input
        placeholder="Email"
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={tryLogin}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default LoginPage;
