import axios from '../api/axios';

export async function checkUserAuth(onsuccess: () => void, onfail: () => void) {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken !== null && accessToken !== '') {
    const isAuth = await axios.post('/auth/isAuth', { accessToken: accessToken });

    if (isAuth.data) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      onsuccess();
    } else {
      onfail();
    }
  } else {
    onfail();
  }

  return false;
}