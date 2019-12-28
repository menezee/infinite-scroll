import React, { useEffect, useRef, useCallback, } from 'react';
import { useAnimalsReducer, TYPES } from '../hooks/useAnimalsReducer';
import styles from './app.module.css';
import { AnimalCard, AnimalCounter, Dropdown } from '../components';

function App() {
  const [state, dispatch] = useAnimalsReducer();
  const { selected, loading } = state;
  const { amountToLoad, list } = state[selected];

  const containerRef = useRef(null);

  const memoedHandleScrollPositionChange = useCallback(() => {
    if (hasReachedBottom(containerRef) && loading === false) {
      dispatch({
        type: TYPES.UPDATE_AMOUNT,
        payload: {
          animal: selected,
          amountToLoad: amountToLoad + 10,
        }
      })
    }
  }, [containerRef, state]);

  const hasReachedBottom = ref => {
    return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
  };

  useEffect(() => {
    window.addEventListener('scroll', memoedHandleScrollPositionChange);
    return () =>
      window.removeEventListener('scroll', memoedHandleScrollPositionChange);
  }, [memoedHandleScrollPositionChange]);

  return (
    <>
      <AnimalCounter count={amountToLoad} />
      <div className={styles.container}>
        <Dropdown
          options={['shibes', 'birds', 'cats',]}
          onChange={e => {
            dispatch({
              type: TYPES.SELECTED,
              payload: e.target.value,
            })
          }}
        />
      </div>
      <div
        ref={containerRef}
        className={styles.container}
      >
        {
          list.map((animal, i) => (
            <AnimalCard
              key={i}
              animalImage={animal}
            />
          ))
        }
      </div>
    </>
  );
}

export default App;
