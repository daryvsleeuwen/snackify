import axios from '../api/axios';

export async function checkUserAuth(onsuccess: (data: any) => void, onfail: () => void) {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken !== null && accessToken !== '') {
    const response = await axios.post('/auth/isAuth', { accessToken: accessToken });

    if (response.data) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      onsuccess(response.data);
    } else {
      onfail();
    }
  } else {
    onfail();
  }

  return false;
}
