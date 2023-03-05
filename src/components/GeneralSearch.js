import React from "react";

export default function GeneralSearch(props) {
  const handleGeneralSearch = (e) => {
    const result = props.alertData.filter((alerts) => {
      let items = Object.values(alerts);
      for (var i = 0; i < items.length; i++) {
        if (items[i].toLowerCase().includes(e.target.value.toLowerCase())) {
          return alerts;
        }
      }
      return "";
    });

    props.setSearchText({
      text: e.target.value,
      list: result,
    });
  };

  return (
    <input
      className="p-4 rounded-md border border-slate-300 bg-slate-50"
      placeholder="Search"
      type="text"
      id="name"
      name="name"
      value={props.searchText.text}
      onClick={() => {
        var temp = { ...props.dateSearch };
        temp.endDate = "";
        temp.list = [];
        props.setDateSearch(temp);
      }}
      onChange={handleGeneralSearch}
    />
  );
}
