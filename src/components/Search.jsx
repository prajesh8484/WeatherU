import React from "react";
import "./Search.css";

function Search({ fun, click, city}) {
  return (
    <div className="search">
      <input placeholder="Search City" value={city} onChange={(e) => click(e)} type="text" />
      <button type="submit" onClick={fun}>Go</button>
    </div>
  );
}

export default Search;
