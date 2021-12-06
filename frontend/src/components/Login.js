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

  // const [error, setError] = useState(false)

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
      const { data } = await axios.post('/api/auth/login/', formData)
      setItemToLocalStorage(data.token)
      history.push('/')
    } catch (err) {
      console.log(err.response)
    }
  }

  return (
    <Container id='form-container'>
      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control name='email' placeholder='Email' onChange={handleChange} value={formData.email}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control name='password' type='password' placeholder='Password' onChange={handleChange} value={formData.password}/>
        </Form.Group>

        <button type='submit' className='btn btn-primary'>Submit</button>

      </Form>
    </Container>
  )

}
export default Login