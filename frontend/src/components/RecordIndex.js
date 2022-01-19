import React, { useEffect, useState } from 'react'
import axios from 'axios'
import RecordCard from './RecordCard'
import { Col, Container, Row } from 'react-bootstrap'

import ReactPlayer from 'react-player'

const RecordIndex = () => {

  const [records, setRecords] = useState([])
  const [hasError, setHasError] = useState(false)

  const [randomRec, setRandomRec] = useState()

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/records/')
        setRecords(data)
      } catch (err) {
        setHasError(true)
      }

    }
    getData()
  }, [])

  useEffect(() => {

    const chooseRandom = () => {
      const num = Math.floor(Math.random() * records.length)
      setRandomRec(records[num])
    }
    chooseRandom()
  }, [records])

  return (
    <>
      <Container fluid id='record-index-hero' style={{
        padding: '25px',
      }}>
        <Row style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Col style={{ textAlign: 'center' }}>
            <h1 className='text-white title'>Records</h1>
            <p className='subtitle text-white'>Browse and buy a collection of various records. Log in to add your own to the list for others to see!</p>
          </Col>
          <Col>
            {randomRec ?
              <ReactPlayer
                url={randomRec.soundcloud_link}
                height='200px'
                style={{ 
                  border: 'solid rgba(231, 129, 13) 5px',
                  borderRadius: '5px',
                }}
              />
              :
              <p>Loading</p>
            }
          </Col>
        </Row>
      </Container>
      <section>
        <div className='container-md my-4'>
          {records ?
            <div className='row row-cols-4'>
              {records.map(record => {
                return (
                  <div key={record.id} className='col mb-3'>
                    <RecordCard key={record.id} {...record} />
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
export default RecordIndex