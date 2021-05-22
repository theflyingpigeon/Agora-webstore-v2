import React from 'react';
import {SocialIcon} from "react-social-icons";

function Footer() {
    return (
        <div className={"footer"}>
            <SocialIcon url={"https://www.instagram.com/agorathu/"} fgColor={"rgb(167,136,12)"} bgColor={"rgb(0,47,0)"}/>
            <br />
            <br />
            <p>KVK number: [insert KVK number]</p>
        </div>
    );
}

export default Footer;