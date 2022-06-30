import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect, createContext } from 'react';
import { checkUserAuth } from '../common/utils/auth';
import '../assets/css/style.css';

export const UserContext = createContext(null);

function App({ Component, pageProps }) {
  const router = useRouter();
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (router.pathname === '/login') {
      setPage(<Component {...pageProps} />);
    } else {
      checkUserAuth(
        (data: any) => {
          if (router.pathname === '/session' && data.role !== 'ADMIN') {
            window.location.href = '/login';
            return;
          }

          setPage(
            <UserContext.Provider value={data}>
              <Component {...pageProps} />
            </UserContext.Provider>,
          );
        },
        () => {
          window.location.href = '/login';
        },
      );
    }
  }, []);

  return page;
}

export default App;
