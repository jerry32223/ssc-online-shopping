import React from "react";
import Profileitem from "./profileitem";

function Profile({ item, index }) {
  return (
    <div key={index}>
      <div>{item.profile}</div>
      {item.item.map((list, listIndex) => (
        <Profileitem list={list} key={listIndex} />
      ))}
    </div>
  );
}

export default Profile;
