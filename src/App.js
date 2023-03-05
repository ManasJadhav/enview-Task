import React, { useEffect, useState } from "react";
import AlertList from "./components/AlertList";
import DateRangePicker from "./components/DateRangePicker";
import GeneralSearch from "./components/GeneralSearch";
import VehicleSearchBar from "./components/VehicleSearchBar";

function App() {
  const [alertData, setAlertData] = useState([]);
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState({
    text: "",
    list: [],
  });
  const [vehicleSearch, setVehicleSearch] = useState({
    vehicleNumber: "",
    list: [],
  });

  const [dateSearch, setDateSearch] = useState({
    startDate: "",
    endDate: "",
    list: [],
  });

  //  this useEffect is used to get data when page renders first time
  useEffect(() => {
    async function getData() {
      const res = await fetch("./data/alert.json");
      const data = await res.json();
      if (data) {
        setAlertData(data);
      }
    }
    getData();
  }, [alertData]);

  return (
    <div className="p-4 bg-slate-200 h-screen">
      <div className="flex space-x-8">
        <GeneralSearch
          alertData={alertData}
          searchText={searchText}
          setSearchText={setSearchText}
          setDateSearch={setDateSearch}
        />
        <VehicleSearchBar
          setShow={setShow}
          show={show}
          alertData={alertData}
          vehicleSearch={vehicleSearch}
          setVehicleSearch={setVehicleSearch}
          setDateSearch={setDateSearch}
          dateSearch={dateSearch}
        />
        <DateRangePicker
          alertData={alertData}
          dateSearch={dateSearch}
          setDateSearch={setDateSearch}
        />
      </div>
      <div
        onClick={() => {
          setShow(false);
        }}
      >
        <div className="bg-white mt-4 p-4 rounded-md border border-slate-300">
          <h1 className="font-bold text-lg tracking-wide pl-3">Alerts</h1>
        </div>
        <div className="mt-3">
          {/* This is will dynamically render the list of matching alert according to searched
          vehicle number.

          if no vehiclenumber is provided it will render all the data */}
          {dateSearch.startDate === "" || dateSearch.endDate === ""
            ? searchText.text === ""
              ? vehicleSearch.vehicleNumber === ""
                ? alertData.map((data) => {
                    return (
                      <AlertList
                        data={data}
                        alertData={alertData}
                        setAlertData={setAlertData}
                      />
                    );
                  })
                : vehicleSearch.list.map((data) => {
                    return (
                      <AlertList
                        data={data}
                        alertData={alertData}
                        setAlertData={setAlertData}
                      />
                    );
                  })
              : searchText.list.map((data) => {
                  return (
                    <AlertList
                      data={data}
                      alertData={alertData}
                      setAlertData={setAlertData}
                    />
                  );
                })
            : dateSearch.list.map((data) => {
                return (
                  <AlertList
                    data={data}
                    alertData={alertData}
                    setAlertData={setAlertData}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default App;
