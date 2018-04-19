import React from "react";

const UserErrors = props => {
  return (
    <div>
      {props.errors.length > 0 &&
        props.errors.map(error => {
          return (
            <p style={{ color: "red" }}>
              {error.code} : {error.message}
            </p>
          );
        })}
    </div>
  );
};

export default UserErrors;
