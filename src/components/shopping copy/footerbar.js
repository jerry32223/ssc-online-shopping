import React from "react";
import "./shopping.css";

const Footerbar = ({ totalmoney, qty, handleChange, handleSubmit }) => {
    return (
        <div className="Product-footer">

            <form onSubmit={handleSubmit}>
                <div className="row m-3">
                    <div className="col-3 "><div className="float-right">
                        <input
                            type="number"
                            className="form-control"
                            value={qty}
                            onChange={(e) => handleChange(e)}
                        />
                    </div></div>
                    <div className="col-4">
                        <h2 className="card-title">${totalmoney}</h2>


                    </div>

                    <div className="col-5">
                        <button className="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Footerbar;
