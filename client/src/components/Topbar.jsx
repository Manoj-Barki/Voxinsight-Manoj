import React from 'react'
import logo from './../assets/Logo.png'
import './../App.css'
import title from './../assets/title.png'
import profile from './../assets/profile.png'

function Topbar() {
    return (
        <div className="topbar">
            <img className='logo' src={logo} ></img>
            <img className='title' src={title}></img>
            <img className='profile' src={profile}></img>
        </div>
    )
}

export default Topbar;