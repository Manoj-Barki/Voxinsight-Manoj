import React from "react";
import product from "./../assets/product.png"
import './../App.css'

function Content() {
    return(
        <div className="content">
            <h1>HP 17 Laptop, 17.3” HD+, Intel Quad Core i3-1125G4 Processor, 32GB RAM, 1TB SSD, Windows 11 Pro, Anti-Glare Display, Long Battery Life, Wi-Fi, Bluetooth, Webcam, HDMI, Alpacatec Accessories, Silver</h1>
            <img className="product" src={product}></img>
        </div>
    )
}

export default Content
