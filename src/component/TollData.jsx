import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./TollData.css";

function TollData() {
  const tollData = useSelector((state) => state.tollData.data.route);
  
  return (
    <>
      {tollData?.hasTolls ? (
        <div className="table-container">
          <div className="table-head">
            <h3>Toll amount</h3>
            <h3>Fuel amount (apx)</h3>
            <h3>Total (Toll + Fuel)</h3>
          </div>
          <div className="table-data">
            <p>{tollData.costs.tag || tollData.costs.cash}</p>
            <p>{tollData.costs.fuel}</p>
            <p>{Math.round((tollData.costs.tag || tollData.costs.cash) +tollData.costs.fuel)}</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default TollData;
