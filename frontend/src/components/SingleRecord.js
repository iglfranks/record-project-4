import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Col, Row, Container, Figure } from 'react-bootstrap'



const SingleRecord = () => {

  const [record, setRecord] = useState([])
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

  }, [record])

  console.log(hasError)
  console.log(recordTypeInfo)
  return (
    <Container style={{ marginTop: '75px'  }}>
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

            <Col style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h4>{record.title}</h4>
              <h5>{record.release_date}</h5>
            </Col>
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

      <Row>

      </Row>

    </Container>
  )

}

export default SingleRecord