import React, { useState } from "react";
import "./Searchbar.css";
import { FaSearch, FaMicrophone } from "react-icons/fa";
import Searchlist from "./Searchlist";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Searchbar() {
  const [Searchquery, setSearchquery] = useState("");
  const [searchList, setSearchList] = useState(false);

  // Fetch video titles and filter based on the search query
  const TitleArray = useSelector((s) => s?.videoreducer)
    ?.data?.filter((q) =>
      q?.videotitle.toUpperCase().includes(Searchquery?.toUpperCase())
    )
    .map((m) => m?.videotitle);

  return (
    <div className="SearchBar_Container">
      <div className="Searchbar_Container2">
        <div className="search_div">
          <input
            type="text"
            name="SearchBar"
            placeholder="Search"
            value={Searchquery}
            onChange={(e) => setSearchquery(e.target.value)}
            onClick={() => setSearchList(true)}
            id="SearchBar"
            className="iBox_SearchBar"
          />
          <Link to={`/search/${Searchquery}`}>
            <FaSearch
              className="searchIcon_SearchBar"
              onClick={() => setSearchList(false)}
            />
          </Link>
          <FaMicrophone className="Mic_SearchBar" />
          {Searchquery && searchList && (
            <Searchlist
              TitleArray={TitleArray}
              setSearchquery={setSearchquery}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
