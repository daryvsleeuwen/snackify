import React, { useEffect, useState } from 'react';
import axios from '../common/api/axios';
import { useRouter } from '../../../../node_modules/next/router';

const Root = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  const checkUserAuth = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken !== null && accessToken !== '') {
      const isAuth = await axios.post('/auth/isAuth', { accessToken: accessToken });

      if (isAuth.data) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setAuthenticated(true);
      } else {
        router.push('/login');
      }
    } else {
      router.push('/login');
    }

    return false;
  };

  useEffect(() => {
    checkUserAuth();
  });

  return authenticated ? <h1>Snackify v2</h1> : null;
};

export default Root;
