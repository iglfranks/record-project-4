/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Carousel, Row } from 'react-bootstrap'
import axios from 'axios'
import HomeCarousel from './HomeCarousel'
import SoundCloud from 'react-custom-soundcloud'
import ReactPlayer from 'react-player'

const Home = () => {

  const [records, setRecords] = useState([])
  const [hasError, setHasError] = useState(false)

  const fewRecords = []
  const [theFewRecords, setTheFewRecords] = useState([])


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/records')
        setRecords(data)
      } catch (err) {
        console.log(err)
        setHasError(true)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    let item
    const set = () => {
      for (let i = 0; i < 6; i++) {
        item = records[i]
        if (!item) return
        fewRecords.push(item)
      }
      setTheFewRecords(fewRecords)
    }
    set()
  }, [records])

  console.log(records)
  console.log(theFewRecords)
  return (
    <>
      <section className='home-hero'>
        <div className='px-4 py-5' style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>

          <div className='d-flex flex-column align-content-center'>
            <h1 className='fw-bold text-white'>RECORD-ID</h1>
            <div>
              <p className='text-white'>Browse an array of records varying in genre to add to your collection.</p>
            </div>
          </div>

          <div id='playlist-box'>
            {/* <SoundCloud
              playlist='1245424987'
            /> */}

            <ReactPlayer
              url={'https://soundcloud.com/beltersmag/sets/belters-free-tunes'}
              height='450px'
              style={{
                border: 'solid rgba(231, 129, 13, 0.822) 5px',
                borderRadius: '5px',
              }}
            />
          </div>
        </div>
      </section>
      <section>
        <div className='container-fluid py-3' style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}>
          <h1 style={{ color: 'white' }}>Featured Records</h1>
        </div>
        <div>
          {theFewRecords !== [] ?
            <>
              <Carousel id='home-carousel' variant="dark" pause='hover'>
                {theFewRecords.map(rec => {
                  return (
                    <Carousel.Item className='carousel-item' key={rec.id} style={{
                      textAlign: 'center',
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${rec.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'cover',
                      paddingTop: '30px',
                    }}>
                      <HomeCarousel {...rec} />
                    </Carousel.Item>
                  )
                })}
              </Carousel>
            </>

            :

            <>
              {hasError ?
                <h1>error</h1> : <h1>loading</h1>
              }
            </>
          }
        </div>

      </section>
      {/* <div>
        <SoundCloud
          playlist='1245424987'
        // theme='light'
        />
      </div> */}
    </>
  )

}

export default Home