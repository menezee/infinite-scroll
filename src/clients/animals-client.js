async function fetchAnimals(type, amount) {
  if (amount === 0) {
    return [];
  }
  const res = await fetch(`/api/${type}?count=${amount}`);
  return res.json();
}

const AnimalsClient = {
  fetchAnimals,
};

export {
  AnimalsClient
};
