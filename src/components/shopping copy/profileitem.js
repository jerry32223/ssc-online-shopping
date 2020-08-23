import React from "react";

function Profileitem({ list, listIndex, selectList, setSelectList, basePrice, setBasePrice }) {

    const liActive =
        listIndex === selectList
            ? "list-group-item btn-outline-info active"
            : "list-group-item btn-outline-info";
    const handleSelect = () => {
        setSelectList(listIndex)
        setBasePrice(list.price)
    }

    const displayPrice = parseFloat(list.price) - parseFloat(basePrice)
    return (
        <ul className="list-group m-3" >
            <li className={liActive} onClick={() => handleSelect()} style={{ cursor: "pointer" }}>
                <div className="row">
                    <div className="col-md-8">{list.name}</div>
                    <div className="col-md-4 text-right">{displayPrice !== 0 && `$${displayPrice}`}</div>
                </div>
            </li>
        </ul>
    );
}

export default Profileitem;
