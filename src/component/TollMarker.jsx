import React, { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";
import tollImage from '../assets/location marker/toll.jpg'
import PopUpDetails from "./PopUpDetails";

function TollMarker() {
  const toll = useSelector((state) => state.tollData.tolls);
  console.log(toll)
  const icon = new L.icon({
    iconUrl: tollImage,
    iconSize: [25, 25],
  });
 
  return (
    <>
      {toll.length>0
        ? toll.map((toll, index) => {
            if (toll?.id)
              return (
                <Marker
                  key={toll.id}
                  icon={icon}
                  position={[
                    toll?.point?.geometry.coordinates[1],
                    toll?.point?.geometry.coordinates[0],
                  ]}
                >
                  <Popup>
                    <PopUpDetails
                      name={toll.name}
                      key={index}
                      tagCost={toll.tagCost}
                      tagCostReturn={toll.tagCostReturn}
                      tagCostMonthly={toll.tagCostMonthly}
                      cashCost={toll.cashCost}
                    />
                  </Popup>
                </Marker>
              );
          })
        : ""}
    </>
  );
}

export default TollMarker;
