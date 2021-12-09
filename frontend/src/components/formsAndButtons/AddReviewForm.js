import React, { useState } from 'react'
import { Form, FloatingLabel, Row } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router'
import { getTokenFromLocalStorage } from '../helpers/auth'


const AddReviewForm = () => {

  const { id } = useParams()

  const [formData, setFormData] = useState({
    comment: '',
    rating: '',
    record: id,
  })



  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
    
  }

  const handleNumChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: parseInt(event.target.value) }
    setFormData(newFormData)
    console.log(newFormData)
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
      console.log('pushed')
    } catch (err) {
      // setErrors(err.response.data)
      console.log(err.response.data)
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
              value={formData.username}
              onChange={handleChange} />
          </FloatingLabel>
        </Form.Group>

        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Select
            name='rating'
            value={parseInt(formData.rating)}
            onChange={handleNumChange}
            style={{ width: '30%' }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <button type='submit' className='btn btn-primary'>Submit</button>

    </Form>
  )

}
export default AddReviewForm