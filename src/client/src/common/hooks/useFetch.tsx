//useFetch.js
import { useState, useEffect } from 'react';
import axios from '../api/axios';

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetch = () => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };
  useEffect(() => {
    fetch();
  }, [url]);

  const refetch = () => {
    setLoading(true);
    fetch();
  };

  return { data, loading, error, refetch };
};

export default useFetch;
