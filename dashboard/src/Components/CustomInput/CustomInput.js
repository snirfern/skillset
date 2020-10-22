import React from "react";
import "./CustomInput.css";
export default function CustomInput({
  icon,
  placeholder,
  customClass,
  onChange,
  valueIn,
}) {
  return (
    <div className="custom_input_container">
      {icon && <span style={{ padding: 5, color: "grey" }}>{icon}</span>}

      <input
        value={valueIn}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
        className={["custom_input", customClass].join(" ")}
        placeholder={placeholder || ""}
      />
    </div>
  );
}
