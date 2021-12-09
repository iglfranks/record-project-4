/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Carousel, Row } from 'react-bootstrap'
import axios from 'axios'
import HomeCarousel from './HomeCarousel'

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
        <div className='px-4 py-5 d-flex justify-content-center'>
          <div className='d-flex flex-column align-content-center'>
            <h1 className='fw-bold text-white'>RECORDID</h1>
            <div>
              <p className='text-white'>Subtitle for your records</p>
            </div>
          </div>
        </div>
      </section>
      <section>
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
                      <HomeCarousel {...rec}/>
                    </Carousel.Item>
                  )
                })}
              </Carousel>
            </>

            :
            
            <Row>
              <h1>test</h1>
            </Row>
          }
        </div>
        
      </section>
    </>
  )

}

export default Home