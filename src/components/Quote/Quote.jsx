import React, { useState } from "react";
import "./Quote.css";
import { cit } from "../../constants/Citaty";

function Citata({ num }) {
  return (
    <div >
      <hr />
      <div className="citata">{cit[num]}</div>
      <hr />
    </div>
  );
}

export default Citata;
