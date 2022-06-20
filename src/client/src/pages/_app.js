import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import '../assets/css/style.css';
import { checkUserAuth } from '../common/utils/auth';

function App({ Component, pageProps }) {
  const router = useRouter();
  const [page, setPage] = useState(null);

  useEffect(() => {
    if (router.pathname !== '/login') {
      checkUserAuth(
        () => {
          setPage(<Component {...pageProps} />);
        },
        () => {
          window.location.href = '/login';
        },
      );
    } else {
      setPage(<Component {...pageProps} />);
    }
  }, []);

  return page;
}

export default App;
