async function fetchAnimals(amount = 10) {
  if (amount === 0) {
    return [];
  }
  const res = await fetch(`/api/animals?count=${amount}`);
  return res.json();
}

const AnimalsClient = {
  fetchAnimals,
};

export {
  AnimalsClient
};
