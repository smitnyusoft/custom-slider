import React, { useEffect, useState } from 'react';
import './App.css';
import Slider from './Components/Slider/Slider-Video-working'
import { Button, Row, Col, Container, Figure } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import ReactPlayer from 'react-player'
import axios from 'axios';
 const ASSETS_URL = 'http://localhost/gmx/assets'
function App() {
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0)
  const [activities, setActivities] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = (value, index) => {
    setActiveIndex(index)
    setShow(true)
  }
  const images = [
    // '../Imgs/img1.jpg',
    // '../Imgs/img2.jpg',
    // '../Imgs/img3.jpg',
    // '../Imgs/img4.jpg',
    // '../Imgs/img5.jpg',
    '../Imgs/SampleVideo.mp4',
    '../Imgs/file_example.ogg',
    '../Imgs/IMG_1648.MOV',
  ]
  const getAttachments = () => {
    const formData = {
      type: 'brand',
      slug: 'tate-keith',
      page: 0,
      limit: 5,
    }
    axios.post('http://localhost:3333/api/v1/posts', formData)
      .then((response) => {
        console.log('response---->', response.data.data.rows);
        setActivities(response.data.data.rows)
      })
  }

  useEffect(() => {
    getAttachments()
  }, [])

  return (
    <>
      <Container>
        {/* <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button> */}

        <Modal show={show} fullscreen={true} onHide={handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <Slider sliderIndex={activeIndex} images={images} />
          </Modal.Body>
        </Modal>
        <Row className="justify-content-md-center">
          {
            images.map((obj, index) => {
              return <Col lg={3} md={4} sm={6} key={'attachment' + index}>
                <a href="#" className="thumbnail" onClick={() => handleShow(true, index)}>
                  <img style={{ width: '50%', height: '50%' }} className="cover" src={process.env.PUBLIC_URL + obj} alt="postedImage" />
                  {/* {aIndex == 3 ? <span className="more-images">{activity.attachments.length - 4 == 0 ? null : `+${activity.attachments.length - 4}`}</span> : null} */}
                </a>
              </Col>
            })
          }
        </Row>
        <Row className="justify-content-md-center">
          {activities.map((activity, index) => {
            return (
              <>
                <Row key={index}>
                  <Col sm="auto" >
                    <Figure className="figure figure-circle figure-gray-2 figure-62">
                      <img className="cover" src={ASSETS_URL + activity.fromUser?.profilePath ?? "/profile/no-profile-image.jpg"} alt="profile" />
                    </Figure>
                  </Col>
                  <Col>
                    <div>
                      <h3 className="text-white fs-18">{activity.fromUser?.fullName} <span className="color-a5a5a5 fs-14 fw-normal ms-2">{activity.createdAt}</span></h3>
                      <p>{activity.post}</p>
                    </div>
                    <Row onClick={() => setIsOpen(true)}>
                      {activity.attachments?.length > 0 &&
                        activity.attachments.map((attachmentFile, aIndex) => (
                          <Col lg={3} md={4} sm={6} key={'attachment' + aIndex}>
                            {/* <LightboxModel
                              isOpen={isOpen}
                              close={false}
                              images={attachmentFile.attachment}
                            /> */}
                            {
                              aIndex <= 3 ?
                                attachmentFile.attachmentType == 2 ?
                                  <div className="gallery-image" onClick={() => setIsOpen(true)}>
                                    < ReactPlayer
                                      className='react-player'
                                      width='100%'
                                      height='100%'
                                      url={ASSETS_URL + attachmentFile.attachment}
                                      playing={true}
                                      controls={true}
                                      //volume={5}
                                      muted={true}
                                    />
                                    {aIndex == 3 ? <span className="more-images">{activity.attachments.length - 4 == 0 ? null : `+${activity.attachments.length - 4}`}</span> : null}
                                  </div>
                                  :
                                  <a href="#" className="gallery-image" onClick={() => setIsOpen(true)}>
                                    <img className="cover" src={ASSETS_URL + attachmentFile.attachment} alt="postedImage" />
                                    {aIndex == 3 ? <span className="more-images">{activity.attachments.length - 4 == 0 ? null : `+${activity.attachments.length - 4}`}</span> : null}
                                  </a>
                                : null
                            }
                          </Col>
                        ))
                      }
                    </Row>
                    <div className="d-sm-flex justify-content-between align-items-center">
                      <ul className="comment-icons nav mb-3">
                        <li>
                          <a href="#">
                            <i className="icon icon-triangle"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="icon icon-chat-bubble"></i>
                          </a>
                        </li>
                        <li 
                        //onClick={() => submitRepost(activity.id)}
                        >
                          <a href="#">
                            <i className="icon icon-reposts"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="icon icon-share-file"></i>
                          </a>
                        </li>
                      </ul>
                      <ul className="likes-comments nav">
                        {/* <li><span className="text-white">{activity.likes.length}</span> Likes</li> */}
                        <li><span className="text-white">705</span> Comments</li>
                        {/* <li><span className="text-white">{activity.reposts.length}</span>{activity.reposts.length > 0 ? <a className="color-a5a5a5" onClick={(e) => {
                                                                                        setCurrentRepostPost(activity.postUniqueId);
                                                                                        repostsModalShow();
                                                                                    }}>Reposts</a> : 'Reposts'}</li> */}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </>
            )
          })
          }
        </Row>
        {/* < ReactPlayer
          className='react-player'
          width='100%'
          height='100%'
          // url={ASSETS_URL + attachmentFile.attachment}
          url={process.env.PUBLIC_URL + images[0]}
          playing={true}
          controls={true}
          // playIcon={<button>Play</button>}
          //volume={5}
          muted={true}
        // onClickPreview={true}
        /> */}
        {/* {
          images.map((data, index) => {
            return <video width="320" height="240" controls>
              <source src={process.env.PUBLIC_URL + data} />
            </video>
          })
        } */}



      </Container>
    </>
  );
}

export default App;
