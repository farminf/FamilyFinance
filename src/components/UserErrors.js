import React from "react";

const UserErrors = props => {
  return (
    <div
      style={{
        top: "10%",
        position: "fixed",
        width: "100%"
      }}
    >
      {props.errors.length > 0 &&
        props.errors.map(error => {
          return (
            <p key={error.code} style={{ color: "red" }}>
              {error.code} : {error.message}
            </p>
          );
        })}
    </div>
  );
};

export default UserErrors;
