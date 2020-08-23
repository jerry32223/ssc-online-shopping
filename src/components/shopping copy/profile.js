import React, { useState, useEffect } from "react";
import Profileitem from "./profileitem";

function Profile({ item, index, handleAddPrice }) {
  const [selectList, setSelectList] = useState(0);
  const [basePrice, setBasePrice] = useState(0);

  useEffect(() => {
    handleAddPrice(index, selectList, basePrice);
  }, [selectList]);
  return (
    <div key={index}>
      <div>{item.profile}</div>
      {item.item.map((list, listIndex) => (
        <Profileitem
          list={list}
          listIndex={listIndex}
          key={listIndex}
          selectList={selectList}
          setSelectList={setSelectList}
          basePrice={basePrice}
          setBasePrice={setBasePrice}
        />
      ))}
    </div>
  );
}

export default Profile;
