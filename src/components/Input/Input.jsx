import React, { useState } from "react";

function Input() {
    const [value, setValue]=useState('Могилёв');
  const handleValue = (e) => {
    setValue(e.target.value)
  };
  return (
    <div>
      Введите город:
      <input type="text" value={value} onChange={handleValue} />
    </div>
  );
}

export default Input;
