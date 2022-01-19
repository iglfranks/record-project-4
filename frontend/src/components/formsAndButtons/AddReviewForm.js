import React, { useState } from 'react'
import { Form, FloatingLabel, Row, Button } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router'
import { getTokenFromLocalStorage, getPayload } from '../helpers/auth'


const AddReviewForm = () => {

  const { id } = useParams()
  const [hasError, setHasError] = useState(false)

  const [formData, setFormData] = useState({
    comment: '',
    rating: '',
    record: id,
  })

  const userIsAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return false
    return true
  }

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)

  }

  const handleNumChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: parseInt(event.target.value) }
    setFormData(newFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/reviews/',
        formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      window.location.reload()
    } catch (err) {
      setHasError(true)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Form.Group>
          <FloatingLabel label='Comment'>
            <Form.Control
              as='textarea'
              name='comment'
              value={formData.comment}
              onChange={handleChange} />
            <Form.Text className='text-danger'>{hasError ? 'Please enter a comment!' : ''}</Form.Text>
          </FloatingLabel>
        </Form.Group>
        <div style ={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Select
              className={hasError ? 'border-danger' : '' }
              name='rating'
              value={parseInt(formData.rating)}
              onChange={handleNumChange}
              style={{ width: '100%' }}
            >
              <option>-</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Select>
          </Form.Group>
          {!userIsAuthenticated() ?
            <Button disabled>Login to make a review!</Button>
            :
            <Button 
              type='submit' 
              variant='primary'
              style ={{  
                height: '40px',
                borderRadius: '10px',
              }}
            >
              Submit</Button>
          }
          
        </div>
      </Row>

    </Form>
  )

}
export default AddReviewForm