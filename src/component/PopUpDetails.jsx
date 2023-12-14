import React from "react";
import './PopUpDetails.css'
function PopUpDetails({ name, tagCost, tagCostReturn,tagCostMonthly ,cashCost}) {
  return (
    <div className="toll-popup">
        <h3>{name}</h3>
      <div className="tagDetails">
        <h4>Tag Cost</h4>
        <h4>{tagCost}</h4>
      </div>
      <div className="tagDetails">
        <h4>Tag Return Cost</h4>
        <h4>{tagCostReturn}</h4>
      </div>
      <div className="tagDetails">
        <h4>TagCost Monthly</h4>
        <h4>{tagCostMonthly}</h4>
      </div>
      <div className="tagDetails">
        <h4>cash cost</h4>
        <h4>{cashCost}</h4>
      </div>
    </div>
  );
}

export default PopUpDetails;
