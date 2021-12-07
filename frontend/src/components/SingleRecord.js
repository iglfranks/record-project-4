import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

import { Col, Row, Container, Figure, Card } from 'react-bootstrap'
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
  // console.log(recordTypeInfo)
  // console.log(reviews)
  // console.log(record)
  return (
    <Container style={{ marginTop: '75px' }}>
      <Row id='pic-and-info'>

        <Col md={{ span: 4 }}>
          <Figure>
            <Figure.Image
              src={record.image}
              alt={`${record.title} Cover`}
              id='record-single-pic'
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
                  <h5>{record.release_date}</h5>
                </Col>
                {/* <hr /> */}
              </div>
              <div id='button-div'>
                {/* <button className='btn btn-primary'>Fave</button> */}
                <AddToFave />
              </div>
            </div>
            <hr />

            <Col>
              <p>Label: {record.label}</p>
              <p>Genre: {record.genre}</p>
            </Col>
            <hr />

            <Col>
              <Row>
                <Col>
                  <p>{recordTypeInfo}</p>
                </Col>
                <Col>
                  <p>{record.link}</p>
                </Col>
              </Row>
            </Col>

          </Row>
        </Col>
      </Row>
      <Container className='d-flex' id='artists-and-reviews'>
        {artists ?
          <Row lg={3} sm={3}>
            {artists.map(art => {
              return (
                <Col key={art.id}>
                  <Card>
                    <Link to={`/artists/${art.id}`}>
                      <Figure>
                        <Figure.Image
                          src={art.image}
                          alt={`${art.name} Profile Pic`}
                          id='record-single-pic'
                        />
                      </Figure>
                    </Link>
                  </Card>
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
                    <Card key={rev.id}>
                      <ReviewList key={rev.id} {...rev} />
                    </Card>
                  )
                })}
              </Col>
              :
              <Row>
                <h1>error</h1> : <h1>Loading</h1>
              </Row>
            }
          </Col>

        </Row>
      </Container>

    </Container>
  )

}

export default SingleRecord