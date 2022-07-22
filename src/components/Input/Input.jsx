import React, { useState } from "react";
import "./Input.css";
import ContrastIcon from "@mui/icons-material/Contrast";
function Input({ getVal, generation, themeToggle }) {
  const [value, setValue] = useState("Могилёв");
  const handleValue = (e) => {
    setValue(e.target.value);
  };
  const handleSearch = () => {
    getVal(value);
    generation();
  };
  return (
    <div className="input">
      <ContrastIcon onClick={themeToggle} className='change_theme' />
      <p> Введите город:</p>
      <input type='text' value={value} onChange={handleValue} />
      <button onClick={handleSearch} className='btn'>
        поиск
      </button>
    </div>
  );
}

export default Input;
