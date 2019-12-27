import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useAnimals } from '../hooks';
import styles from './app.module.css';
import { AnimalCard, AnimalCounter } from '../components';

function App() {
  const containerRef = useRef(null);
  const [amountToLoad, setAmountToLoad] = useState(10);
  const animals = useAnimals(amountToLoad);

  const memoedHandleScrollPositionChange = useCallback(() => {
    if (hasReachedBottom(containerRef)) {
      setAmountToLoad(oldAmount => oldAmount + 10);
    }
  }, [containerRef]);

  const hasReachedBottom = ref => {
    return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
  };

  useEffect(() => {
    window.addEventListener('scroll', memoedHandleScrollPositionChange);
    return () =>
      window.removeEventListener('scroll', memoedHandleScrollPositionChange);
  }, [memoedHandleScrollPositionChange]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
    >
      <AnimalCounter count={amountToLoad} />
      {
        amountToLoad !== 0 ? (
          animals.map((animal, i) => (
            <AnimalCard
              key={i}
              animalImage={animal}
            />
          ))
        ) : (
          <h2>
            loading
          </h2>
        )
      }
    </div>
  );
}

export default App;
