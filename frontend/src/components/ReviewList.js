
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { getPayload, getTokenFromLocalStorage } from './helpers/auth'
import axios from 'axios'

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

  const handleDel = async (event) => {
    try {
      axios.delete(
        `/api/reviews/${event.target.id}`,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

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
          {owner.id === userPayload ? <Button id={id} onClick={handleDel}>X</Button> : <div></div>}
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