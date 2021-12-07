
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { getPayload } from './helpers/auth'

const ReviewList = ({ owner, rating, comment }) => {

  const [userPayload, setUserPayload] = useState()


  useEffect(() => {
    const payload = getPayload()
    if (!payload) {
      setUserPayload('')
    } else {
      setUserPayload(payload.sub)
    }
    
  }, [])

  console.log(userPayload)
  return (
    <>
      <Card.Header style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div>
          {owner.username}
        </div>
        <div>
          {owner.id === userPayload ? <button>X</button> : <div></div>}
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>{rating}</Card.Title>
        <Card.Text>{comment}</Card.Text>
      </Card.Body>
    </>
  )

}
export default ReviewList