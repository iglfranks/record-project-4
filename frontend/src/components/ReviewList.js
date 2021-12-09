
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { getPayload, getTokenFromLocalStorage } from './helpers/auth'
import axios from 'axios'
import StarRatings from 'react-star-ratings'

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
          {owner.id === userPayload ? <Button id={id} onClick={handleDel} style={{ 
            borderRadius: '500px',
            backgroundColor: 'darkred',
            border: 'solid darkred',
          }}>X</Button> : <div></div>}
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Title>
          <StarRatings
            rating={rating}
            numberOfStars={5}
            starRatedColor='rgb(255, 209, 57)'
            starDimension='18px'
            starSpacing='3px'
          />
        </Card.Title>
        <Card.Text>{comment}</Card.Text>
      </Card.Body>
    </>
  )

}
export default ReviewList