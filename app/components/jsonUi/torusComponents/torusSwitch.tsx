import React from "react";
 
import "./switch.css";
 
 
export default function TorusSwitch({
  skey,
  label,
  isChecked,
  setIsChecked,
  marginT,
}:any) {
  const handleToggle = () => {
    setIsChecked((prev:boolean) => !prev);
  };
 
  return (
    <div className={`${marginT} `}>
      <span className="switch">
        <input
          key={skey}
          id="switch-rounded"
          type="checkbox"
          className="peer hidden"
          checked={isChecked}
          onChange={handleToggle}
        />
        <label htmlFor="switch-rounded"> {label}</label>
      </span>
    </div>
  );
}
 
 