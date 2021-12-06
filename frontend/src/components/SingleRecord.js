import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Col, Row, Container, Figure } from 'react-bootstrap'



const SingleRecord = () => {

  const [record, setRecord] = useState([])
  const { id } = useParams()
  const [hasError, setHasError] = useState(false)

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

  console.log(hasError)
  console.log(record)
  return (
    <Container>
      <Row>
        <Col md={{ span: 4 }}>
          <Figure>
            <Figure.Image
              src={record.image}
              alt={`${record.title} Cover`}
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

          </Row>

        </Col>
      </Row>
    </Container>
  )

}

export default SingleRecord