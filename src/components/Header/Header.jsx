import React, { useState } from "react";
import Input from "../Input/Input";
import "./Header.css";
import Citata from "../Citata/Citata";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
function Header({ getValinApp }) {
  const [num, setNum] = useState(Math.round(Math.random() * 3));
  const generation = () => {
    setNum(Math.round(Math.random() * 3));
  };
  const getVal = (i) => {
    getValinApp(i);
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <WbSunnyOutlinedIcon style={{fontSize: '2.5rem', margin:'2px'}}/>
          <p>REACT|WEATHER</p>
        </div>
        <div className="data">
          <Input getVal={getVal} generation={generation} />
        </div>
      </div>
      <Citata num={num} />
    </>
  );
}

export default Header;
