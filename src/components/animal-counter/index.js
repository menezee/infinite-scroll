import React from 'react';
import styles from './animal-counter.module.css';

function AnimalCounter({ count }) {
  return (
    <h3 className={styles.info}>
      rendering {count} animals
    </h3>
  );
}

export {
  AnimalCounter,
};
