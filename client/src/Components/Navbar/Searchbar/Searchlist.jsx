import React from "react";
import "./Searchlist.css";
import { CiSearch } from "react-icons/ci";

function Searchlist({ TitleArray, setSearchquery }) {
  return (
    <div className="Container_SearchList">
      {TitleArray.map((m, index) => (
        <p
          key={`${m}-${index}`} // Combine title and index to ensure unique key
          onClick={() => setSearchquery(m)}
          className="titleItem"
        >
          <CiSearch size={22} className="Search_Item" />
          {m}
        </p>
      ))}
    </div>
  );
}

export default Searchlist;
