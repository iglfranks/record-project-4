import React, { useState } from 'react'
import { Form, FloatingLabel } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router'


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
    console.log(newFormData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/reviews/', formData)
      console.log('pushed')
    } catch (err) {
      // setErrors(err.response.data)
      console.log(err.response.data)
    }
  }

  return (
    <Form onSubmit={handleSubmit}>

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
        <Form.Control
          name='rating'
          placeholder='1-5'
          value={formData.rating}
          onChange={handleChange} />
      </Form.Group>

      <button type='submit' className='btn btn-primary'>Submit</button>

    </Form>
  )

}
export default AddReviewForm