import React from 'react';

function Dropdown({ options, onChange }) {
  return (
    <select onChange={onChange}>
      {
        options.map((option, i) => (
          <option key={i}>
            {option}
          </option>
        ))
      }
    </select>
  );
}

export { Dropdown };
