import React from 'react';
import {SocialIcon} from "react-social-icons";

function Footer() {
    return (
        <div className={"footer"}>
            <SocialIcon url={"https://www.instagram.com/agorathu/"} fgColor={"rgb(167,136,12)"} bgColor={"rgb(0,47,0)"}/>
            <SocialIcon url={"https://www.youtube.com/channel/UCfelZ72mgtKvnuda0l_YyAQ"} fgColor={"rgb(167,136,12)"} bgColor={"rgb(0,47,0)"} style={{marginLeft: "1rem"}}/>
            <SocialIcon url={"mailto:shaeme@icloud.com"} fgColor={"rgb(167,136,12)"} bgColor={"rgb(0,47,0)"} network={"email"} style={{marginLeft: "1rem"}}/>
            <br />
            <br />
            <p>KVK number: [insert KVK number]</p>
        </div>
    );
}

export default Footer;