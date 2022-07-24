import React, { useState } from "react";
import "./Quotes.css";
import { quotes } from "../../constants/Quotes";

function Citata({ num }) {
  return (
    <div >
      <hr />
      <div className="quote">{quotes[num]}</div>
      <hr />
    </div>
  );
}

export default Citata;
