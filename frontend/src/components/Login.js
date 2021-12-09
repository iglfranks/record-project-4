import axios from 'axios'
import React, { useState } from 'react'
import { Container, Form } from 'react-bootstrap'
import { useHistory } from 'react-router'



const Login = () => {

  const history = useHistory()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [hasError, setHasError] = useState(false)

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  const setItemToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
    console.log('set')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/login/', formData)
      setItemToLocalStorage(response.data.token)
      history.push('/')
    } catch (err) {
      console.log(err.response)
      setHasError(true)
    }
  }

  return (
    <Container id='login-form-container'>
      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            className={hasError ? 'border-danger' : '' }
            name='email' 
            placeholder='Email' 
            onChange={handleChange} 
            value={formData.email}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            className={hasError ? 'border-danger' : '' } 
            name='password' 
            type='password' 
            placeholder='Password' 
            onChange={handleChange} 
            value={formData.password}/>
          <Form.Text className='text-danger'>{hasError ? 'Your email or password is incorrect.' : ''}</Form.Text>
        </Form.Group>

        <button type='submit' className='btn btn-primary'>Submit</button>

      </Form>
    </Container>
  )

}
export default Login