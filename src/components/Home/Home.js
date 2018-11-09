import React from 'react';
import logo from '../../media/white-logo.png';
import wake from '../../media/wake.png';
import now from '../../media/now.png';
import '../../App';

export default function Home() {
    return (
        <div className="container">
            <div className="home-parent">
                <img className ="wake" src={wake} alt="wake" />
                <img className="main-logo" src={logo} alt="logo" />
                <img className="now" src={now} alt="now" />
            </div>
        </div>
    )
}