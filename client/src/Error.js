import React from "react";
import "./App.css";
import { MdError } from "react-icons/md";

function Error() {
  return (
    <div className="card-margin-top-app">
      <h2>
        <MdError
          style={{
            color: "red",
            position: "relative",
            bottom: 2,
            right: 5,
          }}
        />
        Strona nie istnieje
      </h2>
    </div>
  );
}

export default Error;
