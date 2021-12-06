import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { Col, Row, Container, Figure } from 'react-bootstrap'



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
      // console.log(artist.record_set)
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
          <Container style={{ marginTop: '75px' }}>
            <Row>

              <Col md={{ span: 4 }}>
                <Figure>
                  <Figure.Image
                    src={artist.image}
                    alt={`${artist.name} Pic`}
                    id='record-single-pic'
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
              </Col>

            </Row>

            <Row lg={6}>
              {artistRecords ?
              // {artistRecords.map(art => {
              //   console.log(art)
              //   return (
              //     <Col key={art.title}>
              //       <Card>
              //         <Figure>
              //           <Figure.Image
              //             src={art.image}
              //             // alt={`${record.title} Pic`}
              //             id='record-single-pic'
              //           />
              //         </Figure>
              //       </Card>

              //     </Col>
              //   )
              // })}

                <Col>
                  <Figure>
                    <Figure.Image
                      src={artistRecords.image}
                      // alt={`${record.title} Pic`}
                      id='record-single-pic'
                    />
                  </Figure>
                </Col>
                :
                <>
                  <h1>error</h1> : <h1>Loading</h1>
                </>
              }


            </Row>

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