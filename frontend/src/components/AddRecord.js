import React, { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import axios from 'axios'

const AddRecord = () => {

  const [artistsList, setArtistsList] = useState([])
  const [hasError, setHasError] = useState(false)
  const [artistArray, setArtistArray] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    release_date: '',
    label: '',
    genre: '',
    type_of_record: '',
    is_vinyl_only: true,
    link: '',
    artists: `${artistArray}`,
  })

  const [errors, setErrors] = useState({
    title: '',
    image: '',
    release_date: '',
    label: '',
    genre: '',
    type_of_record: '',
    is_vinyl_only: '',
    link: '',
    artists: '',
  })

  useEffect(() => {
    const getArtistList = async () => {
      try {
        const { data } = await axios.get('/api/artists')
        setArtistsList(data)
      } catch (err) {
        console.log(err)
        setHasError(true)

      }
    }
    getArtistList()
  }, [])

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    // console.log(newFormData)
    setFormData(newFormData)
  }

  const artistSelect = (event) => {
    const art = parseInt(event.target.value)
    const newArtist = [ ...artistArray, art ]
    setArtistArray(newArtist)
    const newFormData = { ...formData, [event.target.name]: newArtist }
    setFormData(newFormData)
    console.log(formData)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post('/api/records/', formData)
      console.log('pushed')
    } catch (err) {
      setErrors(err.response.data)
      console.log(err.response.data)
    }
  }

  console.log(hasError)
  // console.log(artistsList)
  console.log(formData)
  // console.log(errors)
  return (
    <Container>
      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            className={`${errors.title ? 'border-danger' : ''}`}
            name='title'
            placeholder='Record Title'
            value={formData.title}
            onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Cover Art</Form.Label>
          <Form.Control
            className={`${errors.image ? 'border-danger' : ''}`}
            name='image'
            type='file'
            onChange={handleChange}
            value={formData.image} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Year Released</Form.Label>
          <Form.Control
            className={`${errors.release_date ? 'border-danger' : ''}`}
            name='release_date'
            placeholder='Release Date'
            value={formData.release_date}
            onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Record Label</Form.Label>
          <Form.Control
            className={`${errors.label ? 'border-danger' : ''}`}
            name='label'
            placeholder='Label'
            value={formData.label}
            onChange={handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Type Of Record</Form.Label>
          <Form.Select
            className={`${errors.type_of_record ? 'border-danger' : ''}`}
            name='type_of_record'
            value={formData.type_of_record}
            onChange={handleChange}
          >
            <option>EP</option>
            <option>LP</option>
            <option>Single</option>
            <option>V/A</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Genre</Form.Label>
          <Form.Select
            className={`${errors.genre ? 'border-danger' : ''}`}
            name='genre'
            value={formData.genre}
            onChange={handleChange}
          >
            <option>UKG</option>
            <option>Breaks</option>
            <option>Jungle</option>
            <option>House</option>
            <option>Drum and Bass</option>
            <option>Techno</option>
            <option>Dubstep</option>
            <option>Other</option>
          </Form.Select>
        </Form.Group>

        <Form.Group>
          <Form.Label>Is the record Vinyl only?</Form.Label>
          <Form.Check
            name='is_vinyl_only'
            type='checkbox'
            value={formData.is_vinyl_only}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Artists</Form.Label>
          <Form.Select
            name='artists'
            multiple={true}
            value={formData.artists}
            onChange={artistSelect}
          >
            {artistsList.map(art => {
              return (
                <option key={art.id} value={art.id}>{art.name}</option>
              )
            })}
          </Form.Select>
        </Form.Group>

        {/* <Form.Group>
          <Form.Label>Artists</Form.Label>
          <Form.Select
            name='artists'
            // value={formData.artists}
            // onChange={handleChange}
            className='selectpicker'
            multiple={true}
          >
            <option>test</option>
            <option>test2</option>

          </Form.Select>
        </Form.Group> */}

            

        <Form.Group>
          <Form.Label>Purchase Link</Form.Label>
          <Form.Control
            className={`${errors.link ? 'border-danger' : ''}`}
            name='link'
            placeholder='Link'
            value={formData.link}
            onChange={handleChange} />
        </Form.Group>

        <button type='submit' className='btn btn-primary'>Submit</button>

      </Form>
    </Container>
  )

}
export default AddRecord