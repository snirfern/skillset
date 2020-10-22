import React from "react";
import "./Modal.css";
export default function Modal({ children, closeModal }) {
  return (
    <div className="modal_container">
      <div className="modal_header"> Selcted post</div>
      {/*<div onClick={() => closeModal()} className={"Backdrop"}></div>*/}
      {children}

      <div style={{ textAlign: "right", padding: 10 }}>
        <button onClick={() => closeModal()} className="modal_close_button">
          Close
        </button>
      </div>
    </div>
  );
}
