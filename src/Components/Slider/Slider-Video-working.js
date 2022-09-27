import React, { useState } from 'react'
// import './Slider.css'
// import BtnSlider from './BtnSlider'
import ReactPlayer from 'react-player'
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
export default function Slider(props) {

    return (
        <div className="App" style={{ background: '#2654' }}>
            <Carousel slide={false} defaultActiveIndex={props.sliderIndex}>
                {props.images.map((videoObj, index) => {
                    return (
                        <Carousel.Item key={index}>
                            <ReactPlayer
                                url={process.env.PUBLIC_URL + videoObj}
                                pip={true}
                                controls={true}
                                playing={true}
                            />
                            {/* <img width={300} height={300}
                                src={process.env.PUBLIC_URL + videoObj} /> */}
                        </Carousel.Item>
                    );
                })}
            </Carousel>
        </div >
    )
}
