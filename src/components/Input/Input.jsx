import React, { useState } from "react";
import "./Input.css"
function Input({getVal, getCit, generation}) {
    const [value, setValue]=useState('Могилёв');
  const handleValue = (e) => {
    setValue(e.target.value)
  };
  const handleSearch=()=>{
     getVal(value);
     generation();
  }
  return (
    <div>
      Введите город:
      <input type="text" value={value} onChange={handleValue} />
      <button onClick={handleSearch} className="btn">search</button>
    </div>
  );
}

export default Input;
