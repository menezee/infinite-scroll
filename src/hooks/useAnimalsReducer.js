import { useReducer, useEffect } from 'react';
import { AnimalsClient } from '../clients';

const TYPES = {
  UPDATE_AMOUNT: 'UPDATE_AMOUNT',
  UPDATE_LIST: 'UPDATE_LIST',
  SELECTED: 'SELECTED',
  LOADING: 'LOADING',
};

const initialState = {
  selected: 'shibes',
  loading: false,
  shibes: {
    amountToLoad: 10,
    list: [],
  },
  birds: {
    amountToLoad: 10,
    list: [],
  },
  cats: {
    amountToLoad: 10,
    list: [],
  },
};

function reducer(state, { type, payload }) {
  switch (type) {
    case TYPES.UPDATE_AMOUNT:
      return {
        ...state,
        [payload.animal]: {
          ...state[payload.animal],
          amountToLoad: payload.amountToLoad,
        },
        loading: true,
      };
    case TYPES.UPDATE_LIST:
      return {
        ...state,
        [payload.animal]: {
          ...state[payload.animal],
          list: payload.list,
        },
        loading: false,
      };
    case TYPES.SELECTED:
      return {
        ...state,
        selected: payload,
      };
    default:
      throw new Error();
  }
}

function isListNotSyncWithAmountToLoad(list, amountToLoad) {
  return list.length !== amountToLoad;
}

function useAnimalsReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selected } = state;

  useEffect(() => {
    let current = true;

    if (isListNotSyncWithAmountToLoad(state[selected].list, state[selected].amountToLoad)) {
      (async () => {
        const amount = state[selected].amountToLoad;
        const animalsResponse =
          await AnimalsClient.fetchAnimals(selected, amount);

        if (current) {
          dispatch({
            type: TYPES.UPDATE_LIST,
            payload: {
              animal: selected,
              list: animalsResponse,
            }
          })
        }
      })();
    }

    return () => current = false;
  }, [
    selected,
    state.shibes.amountToLoad,
    state.birds.amountToLoad,
    state.cats.amountToLoad,
  ]);

  return [state, dispatch];
}

export {
  useAnimalsReducer,
  TYPES,
};
