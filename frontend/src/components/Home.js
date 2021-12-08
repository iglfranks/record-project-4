/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Home = () => {

  // const [carouselItems, setCarouselItems] = useState()
  const [records, setRecords] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/records')
        setRecords(data)
        // console.log(records)
      } catch (err) {
        console.log(err)
        setHasError(true)
        // console.log(hasError)
      }

    }
    getData()
  }, [])

  console.log(records)
  return (
    <>
      <section className='home-hero'>
        <div className='px-4 py-5 d-flex justify-content-center'>
          <div className='d-flex flex-column align-content-center'>
            <h1 className='fw-bold text-white'>Title</h1>
            <div>
              <p className='text-white'>Subtitle for your records</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Carousel id='home-carousel' variant="dark">

          {records.map(rec => {
            return (

              <Carousel.Item className='carousel-item' key={rec.id} style={{
                textAlign: 'center',
                backgroundImage: `${rec.image}`,
                backgroundPosition: 'cover',
              }}>
                <Link to={`/records/${rec.id}`} >
                  <img
                    src={rec.image}
                    alt={`${rec.title} Cover Art`}
                    className='carousel-item-pic'
                  />
                  <Carousel.Caption>{rec.title}</Carousel.Caption>
                </Link>
              </Carousel.Item>

            )
          })}

        </Carousel>
      </section>
    </>
  )

}

export default Home