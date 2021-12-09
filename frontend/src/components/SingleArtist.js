import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { Col, Row, Container, Figure, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'



const SingleArtist = () => {

  const [artist, setArtist] = useState([])
  const [artistRecords, setArtistRecords] = useState()
  const { id } = useParams()


  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/artists/${id}`)
        // console.log(data)
        setArtist(data)
      } catch (err) {
        setHasError(true)
        console.log(err)
      }
    }
    getData()
  }, [id])

  useEffect(() => {
    const addRecords = () => {
      setArtistRecords(artist.record_set)

    }
    addRecords()
  }, [artist])

  console.log(hasError)
  console.log(artistRecords)
  return (
    <>
      {artist ?
        <>
          <Container style={{ marginTop: '65px', marginBottom: '30px' }}>
            <Row>

              <Col md={{ span: 4 }}>
                <Figure>
                  <Figure.Image
                    src={artist.image}
                    alt={`${artist.name} Pic`}
                    id='record-single-pic'
                    style={{
                      border: 'solid black 10px',
                      borderRadius: '10px',
                    }}
                  />
                </Figure>
              </Col>

              <Col>
                <Row>
                  <Col style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <h4>{artist.name}</h4>
                  </Col>
                  <hr />
                </Row>
                <Row>
                  <ReactPlayer
                    url='https://www.youtube.com/watch?v=jo7CUO0p3RU&t=1s'
                  // height='200px'
                  />
                </Row>
              </Col>

            </Row>


            {artistRecords ?
              <Row lg={6}>

                {artistRecords.map(art => {
                  return (
                    <Col key={art.title}>
                      <OverlayTrigger
                        placement='top'
                        overlay={
                          <Tooltip>{art.title}</Tooltip>
                        }
                      >
                        <Card>
                          <Link to={`/records/${art.id}`}>
                            <Figure style={{ margin: '0' }}>
                              <Figure.Image
                                src={art.image}
                                alt={`${art.title} Cover`}
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
              <>
                {hasError ?
                  <h1>error</h1> : <h1>loading</h1>
                }
              </>
            }




          </Container>
        </>
        :
        <>
          {hasError ?
            <h1>error</h1> : <h1>loading</h1>
          }
        </>
      }
    </>
  )

}
export default SingleArtist