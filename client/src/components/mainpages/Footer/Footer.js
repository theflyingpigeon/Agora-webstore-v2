import React from 'react';
import {SocialIcon} from "react-social-icons";

function Footer() {
    return (
        <div style={{bottom: 0}}>
            <SocialIcon url={"https://www.instagram.com/agorathu/"}/>
            <p style={{color: "#555", marginTop: 5}}>KVK number: [insert KVK number]</p>
        </div>
    );
}

export default Footer;