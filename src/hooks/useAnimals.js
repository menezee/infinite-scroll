import { useState, useEffect } from 'react';
import { AnimalsClient } from '../clients';

function useAnimals(amount) {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    let current = true;

    (async () => {
      const animalsResponse = await AnimalsClient.fetchAnimals(amount);

      if (current) {
        setAnimals(animalsResponse);
      }
    })();

    return () => current = false;
  }, [amount]);

  return animals;
}

export {
  useAnimals,
}
