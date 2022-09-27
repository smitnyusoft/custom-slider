import React, { useState } from 'react'
import './Slider.css'
import BtnSlider from './BtnSlider'
import { ListGroup } from 'react-bootstrap';
import ReactPlayer from 'react-player'

export default function Slider(props) {
    console.log('props', props);
    const [slideIndex, setSlideIndex] = useState(props.sliderIndex)

    const nextSlide = () => {
        if (slideIndex !== props.images.length) {
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === props.images.length) {
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if (slideIndex !== 1) {
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1) {
            setSlideIndex(props.images.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider">
            {props.images.map((obj, index) => {
                return (
                    <ListGroup>
                        <div
                            key={obj.id}
                            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                        >
                            <ListGroup.Item>
                                <ReactPlayer
                                    url={process.env.PUBLIC_URL + obj}
                                    pip={true}
                                    controls={true}
                                    playing={true}
                                />
                                {/* <img
                                    src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`}
                                /> */}
                            </ListGroup.Item>
                        </div>
                    </ListGroup>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"} />

            {/* <div className="container-dots">
                {Array.from({ length: 5 }).map((item, index) => (
                    <div
                        onClick={() => moveDot(index + 1)}
                        className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div> */}
        </div>
    )
}