import React, { useState } from 'react'
// import './Slider.css'
// import BtnSlider from './BtnSlider'
import ReactPlayer from 'react-player'
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
export default function Slider(props) {

    return (
        <div className="App">
            <Carousel>
                {props.images.map((videoObj, index) => {
                    return (
                        <Carousel.Item key={index + 'video'}>
                            <ReactPlayer
                                url={process.env.PUBLIC_URL + videoObj}
                                pip={true}
                                controls={true}
                                playing={true}
                            />
                            {/* <img
                                src={process.env.PUBLIC_URL + videoObj} /> */}
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </div>
    )
}
