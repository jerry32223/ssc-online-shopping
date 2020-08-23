import React from "react";

export const Infopicsmall = ({ index, item, handlePic, picNo }) => {
  const styledisplay =
    picNo === index ? { borderBottom: "1px solid #000000" } : { color: "none" };
  return (
    <div
      className="mt-3, p-2 col-3"
      style={styledisplay}
      onClick={() => handlePic(index)}
    >
      <img
        src={item}
        className="pic-items"
        width="100%"
        alt="smallpic"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};
