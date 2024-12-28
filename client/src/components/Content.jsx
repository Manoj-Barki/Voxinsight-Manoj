import React from "react";
import product from "./../assets/product.png"
import './../App.css'

function Content(props) {
    return(
        <div className="content">
            <h1>{props.name}</h1>
            <img className="product" src={product}></img>
        </div>
    )
}

export default Content
