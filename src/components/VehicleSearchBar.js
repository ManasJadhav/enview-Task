import React, { useState } from "react";

export default function VehicleSearchBar(props) {
  const [vehicleData, setVehicleData] = useState([]);

  // get request to get all vehicles for vehicle search using number plate.
  const getAllVehicles = async () => {
    //This is to clear the filed date field and result due to date field
    var temp = { ...props.dateSearch };
    temp.endDate = "";
    temp.list = [];
    props.setDateSearch(temp);

    props.setShow(true);
    const res = await fetch("./data/vehicle.json");
    const data = await res.json();
    if (data) {
      setVehicleData(data);
    }
  };

  // This is called when we change the value of input for vehicle Search bar
  const handleVehicleSearch = (e) => {
    props.setShow(false);
    const result = props.alertData.filter((vehicle) => {
      if (
        vehicle.vehicle_friendly_name.includes(e.target.value.toUpperCase())
      ) {
        return vehicle;
      }
      return "";
    });

    props.setVehicleSearch({
      vehicleNumber: e.target.value,
      list: result,
    });
  };

  const handleDirectVehicleSearch = (number) => {
    const result = props.alertData.filter((vehicle) => {
      if (vehicle.vehicle_friendly_name === number) {
        return vehicle;
      }
      return "";
    });

    props.setVehicleSearch({
      vehicleNumber: number,
      list: result,
    });

    props.setShow(false);
  };

  return (
    <div>
      <input
        className="p-4 rounded-md border border-slate-300 bg-slate-50"
        placeholder="Vehicle #"
        type="search"
        id="vehicleNumber"
        name="vehicleNumber"
        value={props.vehicleSearch.vehicleNumber}
        onChange={handleVehicleSearch}
        onClick={getAllVehicles}
      />
      <div className="absolute">
        {props.show === true
          ? vehicleData.map((data) => {
              return (
                <h1
                  className="bg-white p-4 w-[17.5rem] rounded-md border border-slate-300 cursor-pointer"
                  onClick={() => {
                    handleDirectVehicleSearch(data.friendly_name);
                    props.setShow(false);
                  }}
                >
                  {data.friendly_name}
                </h1>
              );
            })
          : null}
      </div>
    </div>
  );
}
