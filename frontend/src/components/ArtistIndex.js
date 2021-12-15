import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import ArtistCard from './ArtistCard'
import { Col, Container, Row } from 'react-bootstrap'

const ArtistIndex = () => {

  const [artists, setArtists] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/artists')
        setArtists(data)
        // console.log(records)
      } catch (err) {
        console.log(err)
        setHasError(true)
        // console.log(hasError)
      }

    }
    getData()
  }, [])


  console.log(artists)
  console.log(hasError)
  return (
    <>
      <Container fluid id='artist-index-hero' style={{
        padding: '25px',
      }}>
        <Row style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Col style={{ textAlign: 'center' }}>
            <h1 className='text-white title'>Artists</h1>
            <p className='subtitle text-white'>Check out fully credited artists and their work</p>
          </Col>
        </Row>
      </Container>
      <section>
        <div className='container-md my-4'>
          {artists ?
            <div className='row row-cols-4'>
              {artists.map(artist => {
                return (
                  <div key={artist.id} className='col mb-3'>
                    <ArtistCard key={artist.id} {...artist} />

                    

                  </div>
                )
              })}
            </div>
            :
            <div className='row row-cols-1'>
              {hasError ?
                <div className='col'>
                  <h1>An Error has occured!</h1>
                </div>

                : 
                <div className='col'>
                  <h1>Loading...</h1>
                </div>
              }
            </div>
          }
          
        </div>
      </section>
    </>
  )

}
export default ArtistIndex