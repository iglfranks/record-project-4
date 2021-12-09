import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import ImageUploadField from '../ImageUploadField'
import { getTokenFromLocalStorage } from '../helpers/auth'

const AddArtistForm = ({ handleClose }) => {

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    social_link: '',
  })

  const [errors, setErrors] = useState({
    name: '',
    image: '',
    social_link: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const handleArtistSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/artists/', 
        formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      console.log('pushed')
    } catch (err) {
      setErrors(err.response.data)
      console.log(err.response.data)
    }
  }

  const handleImageUrl = (url) => {
    setFormData({ ...formData, image: url })
  }

  console.log(formData)
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add an Artist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleArtistSubmit}>

          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              className={`${errors.name ? 'border-danger' : ''}`}
              name='name'
              placeholder='Artist Name'
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <ImageUploadField
              className={`${errors.image ? 'border-danger' : ''}`}
              value={formData.image}
              name='image'
              handleImageUrl={handleImageUrl}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Social Media Link</Form.Label>
            <Form.Control
              className={`${errors.social_link ? 'border-danger' : ''}`}
              name='social_link'
              placeholder='URL'
              value={formData.social_link}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type='submit' variant='primary' onClick={handleClose}>
            Submit
          </Button>

        </Form>
      </Modal.Body>
    </>
  )

}
export default AddArtistForm