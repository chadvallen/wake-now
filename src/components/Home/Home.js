import React from 'react';
import logo from '../../media/white-logo.png';
import wake from '../../media/wake.png';
import now from '../../media/now.png';
import together from '../../media/together.png';
import story from '../../media/story.png';
import '../../App';

export default function Home() {
    return (
        <div>
            <div className="home-parent">
                <img className ="wake" src={wake} alt="wake" />
                <img className="main-logo" src={logo} alt="logo" />
                <img className="now" src={now} alt="now" />
            </div>
                <img className="desktop-story" src={story} alt="headline" />
                
            <div className="flex-parent-user">
                <img className="together" src={together} alt="logo" />
                <img className="story" src={story} alt="headline" />
            </div>
        </div>
    )
}