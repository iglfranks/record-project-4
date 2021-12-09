import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'

import { Col, Row, Container, Figure, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import AddReviewForm from './formsAndButtons/AddReviewForm'
import ReviewList from './ReviewList'
import AddToFave from './formsAndButtons/AddToFave'



const SingleRecord = () => {

  const [record, setRecord] = useState([])
  const [artists, setArtists] = useState()
  const [reviews, setReviews] = useState()
  const { id } = useParams()
  const [hasError, setHasError] = useState(false)

  const [recordTypeInfo, setRecordTypeInfo] = useState(null)



  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/records/${id}`)
        setRecord(data)
      } catch (err) {
        setHasError(true)
        console.log(err)
      }
    }
    getData()
  }, [id])

  useEffect(() => {

    const setType = () => {
      try {
        if (record.is_vinyl_only === false) {
          setRecordTypeInfo('Availible on digital and vinyl.')
        } else {
          setRecordTypeInfo('Availible on vinyl only.')
        }
      } catch (err) {
        console.log(err)
      }
    }
    setType()

    const setTheArtists = () => {
      setArtists(record.artists)
    }
    setTheArtists()

    const setReviewSet = () => {
      setReviews(record.review_set)
    }
    setReviewSet()

  }, [record]) 

  console.log(hasError)
  return (
    <>
      <Container style={{ marginTop: '45px', marginBottom: '50px' }}>
        <Row id='pic-and-info'>

          <Col md={{ span: 4 }}>
            <Figure >
              <Figure.Image
                src={record.image}
                alt={`${record.title} Cover`}
                id='record-single-pic'
                style={{ 
                  border: 'solid rgba(0, 0, 0, 0.8.5) 10px',
                  borderRadius: '10px',
                }}
              />
            </Figure>
          </Col>

          <Col>
            <Row>
              <div className='d-flex flex-row justify-content-between align-items-center pb-3'>
                <div className='w-100'>
                  <Col style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <h4>{record.title}</h4>
                    
                  </Col>
                </div>
                <div id='button-div'>
                  <AddToFave />
                </div>
              </div>
              <hr />

              <Col>
                <p>Label: {record.label}</p>
                <p>Genre: {record.genre}</p>
                <p>Released: {record.release_date}</p>
              </Col>
              <hr />

              <Col>
                <Row style={{ 
                  display: 'flex',
                  flexDirection: 'column', 
                  
                }}>
                  <Col>
                    <p>{recordTypeInfo}</p>
                  </Col>
                  <Col>
                    <p ><a href={record.link} className='purch-link'>Purchase Link</a></p>
                  </Col>
                </Row>
              </Col>

              <Col className='reactplayer-col'>
                <ReactPlayer
                  url={record.soundcloud_link}
                  height='200px'
                  style={{ 
                    border: 'solid rgba(231, 129, 13, 0.822) 5px',
                    borderRadius: '5px',
                  }}
                />
              </Col>

            </Row>
          </Col>
        </Row>     
      </Container>
      <Container fluid style={{ padding: '0' }}>
        <Container 
          fluid 
          className='d-flex' 
          id='artists-and-reviews' 
          style={{ padding: '50px', 
          }}>
          {artists ?
            <Row lg={3} sm={3} style={{ display: 'flex', flexDirection: 'column' }}>
              <h5>Artists</h5>
              {artists.map(art => {
                return (
                  <Col key={art.id}>
                    <OverlayTrigger
                      placement='top'
                      overlay={
                        <Tooltip>{art.name}</Tooltip>
                      }
                    >
                      <Card>
                        <Link to={`/artists/${art.id}`}>
                          <Figure style={{ 
                            margin: '0',
                            border: 'solid rgba(0, 0, 0, 0.38) 5px',
                            borderRadius: '5px',
                          }}>
                            <Figure.Image
                              src={art.image}
                              alt={`${art.name} Profile Pic`}
                              id='record-single-pic'
                              style={{ margin: '0' }}
                            />
                          </Figure>
                        </Link>
                      </Card>
                    </OverlayTrigger>
                  </Col>
                )
              })}
            </Row>

            :
            <Row>
              <h1>error</h1> : <h1>Loading</h1>
            </Row>
          }
          <Row style={{
            width: '100%',
          }}>

            <Col>
              <AddReviewForm />
            </Col>

            <Col>
              {reviews ?
                <Col>
                  {reviews.map(rev => {
                    return (
                      <Card key={rev.id} style={{ marginBottom: '10px' }}>
                        <ReviewList key={rev.id} {...rev} />
                      </Card>
                    )
                  })}
                </Col>
                :

                <>
                  {hasError ?
                    <h1>Err</h1>
                    :
                    <h1>Loading</h1>
                  }
                </>
              }
            </Col>

          </Row>

        </Container>
      </Container>
    </>
  )

}

export default SingleRecord