import React from "react";
import searchbar from './../assets/search.png'
import './../App.css'

function SearchBar() {
    return (
        <div className="search">
            {/* <img className="bar" src={searchbar}></img> */}
            <div className="bar">
                <input type="text" className="inp" placeholder="Enter the link of product"></input>
            </div>
        </div>
    )
}

export default SearchBar