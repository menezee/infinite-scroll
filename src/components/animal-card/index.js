import React from 'react';
import styles from './animal-card.module.css';

function AnimalCard({ animalImage }) {
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url('${animalImage}')`
      }}
    />
  );
}

export {
  AnimalCard,
};
