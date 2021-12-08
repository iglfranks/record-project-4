
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { getPayload } from './helpers/auth'

const ReviewList = ({ id, owner, rating, comment }) => {

  const [userPayload, setUserPayload] = useState()


  useEffect(() => {
    const payload = getPayload()
    if (!payload) {
      setUserPayload('')
    } else {
      setUserPayload(payload.sub)
    }
    
  }, [])

  const handleDel = async () => {

  }

  console.log(userPayload)
  return (
    <>
      <Card.Header id={id} style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <div>
          {owner.username}
        </div>
        <div>
          {owner.id === userPayload ? <Button onClick={handleDel}>X</Button> : <div></div>}
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