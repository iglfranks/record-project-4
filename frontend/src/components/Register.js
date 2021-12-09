import axios from 'axios'
import React, { useState } from 'react'
import { Container, Form, Row } from 'react-bootstrap'
import { useHistory } from 'react-router'
import ImageUploadField from './ImageUploadField'




const Register = () => {


  const history = useHistory()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    profile_pic: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    profile_pic: '',
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/auth/register/', formData)
      history.push('/login')
    } catch (err) {
      setErrors(err.response.data)
      console.log(err.response.data)
    }
  }

  const handleImageUrl = (url) => {
    setFormData({ ...formData, profile_pic: url })
  }


  console.log(formData)
  return (
    <Container id='form-container'>
      <Form onSubmit={handleSubmit}>
        <div style={{ display: 'flex' }}>
          <Row 
            className='register-div'
            style={{ margin: '20px' }}
          >
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                className={`${errors.username ? 'border-danger' : ''}`}
                name='username'
                placeholder='Username'
                value={formData.username}
                onChange={handleChange} />
              {/* <Form.Text className='text-danger'>{`${errors.username ? `${errors.username}` : 'Required'}`}</Form.Text> */}
            </Form.Group>

            <Form.Group >
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                className={`${errors.email ? 'border-danger' : ''}`}
                name='email'
                placeholder='Email'
                onChange={handleChange}
                value={formData.email} />
              {/* <Form.Text className='text-danger'>{`${errors.email ? `${errors.email}` : 'Required'}`}</Form.Text> */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                className={`${errors.password ? 'border-danger' : ''}`}
                name='password'
                type='password'
                placeholder='Password'
                onChange={handleChange}
                value={formData.password} />
              {/* <Form.Text className='text-danger'>{`${errors.password ? `${errors.password}` : 'Required'}`}</Form.Text> */}
            </Form.Group>

            <Form.Group>
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control
                className={`${errors.password_confirmation ? 'border-danger' : ''}`}
                name='password_confirmation'
                type='password'
                placeholder='Confirm your password'
                onChange={handleChange}
                value={formData.password_confirmation} />
              {/* <Form.Text className='text-danger'>{`${errors.password_confirmation ? `${errors.password_confirmation}` : 'Required'}`}</Form.Text> */}
            </Form.Group>
          </Row>

          <Row 
            className='register-div' 
            style={{
              margin: '20px',
            }}>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control
                className={`${errors.first_name ? 'border-danger' : ''}`}
                name='first_name'
                placeholder='First Name'
                onChange={handleChange}
                value={formData.first_name} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                name='last_name'
                placeholder='Last Name'
                onChange={handleChange}
                value={formData.last_name} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Profile Picture</Form.Label>
              <ImageUploadField
                value={formData.profile_pic}
                name='profile_pic'
                handleImageUrl={handleImageUrl}
              />
            </Form.Group>

            <Form.Group style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
              <Form.Label style={{ color: 'white' }}>.</Form.Label>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </Form.Group>

            
          </Row>
          
        </div>
        
        

      </Form>
    </Container>
  )


}
export default Register