import { useEffect, useState } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    name
      ? axios
          .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
          .then((response) =>
            setCountry({ data: response.data[0], found: true })
          )
          .catch((e) => {
            setCountry({ found: false });
          })
      : setCountry(null);
  }, [name]);

  return country;
};
