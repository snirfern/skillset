import React from "react";
import "./Spinner.css";

const spinner = ({ customClass }) => {
  let spinnerClasses = ["loader"];
  if (!customClass) spinnerClasses.push("big");
  else spinnerClasses.push(customClass);

  return <div className={spinnerClasses.join(" ")}>Loading...</div>;
};

export default spinner;
