import React, { useState, useEffect } from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import axios from 'axios'
import Select from 'react-select'
import ImageUploadField from './ImageUploadField'
import AddArtistForm from './formsAndButtons/AddArtistForm'

const AddRecord = () => {

  const [artistsList, setArtistsList] = useState([])
  const [hasError, setHasError] = useState(false)
  const [show, setShow] = useState(false)

  const [selectOptions, setSelectOptions] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    release_date: '',
    label: '',
    genre: '',
    type_of_record: '',
    is_vinyl_only: false,
    link: '',
    artists: [],
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

  useEffect(() => {
    const options = artistsList.map(art => {
      return (
        { value: `${art.id}`, label: `${art.name}` }
      )
    })
    setSelectOptions(options)
  }, [artistsList])

  const artistSelect = (selected, name) => {
    console.log(name)
    console.log(selected)

    const values = selected ? selected.map(item => parseInt(item.value)) : []
    setFormData({ ...formData, [name]: [...values] })
  }

  const handleImageUrl = (url) => {
    setFormData({ ...formData, image: url })
  }

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    const newFormData = { ...formData, [event.target.name]: value }
    setFormData(newFormData)
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

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  console.log('has error->>>>', hasError)
  console.log(formData)
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
          <Form.Label>Profile Picture</Form.Label>
          <ImageUploadField 
            value={formData.image}
            name='image'
            handleImageUrl={handleImageUrl}
          />
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
            <option>Type of record</option>
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
            placeholder='genre'
            value={formData.genre}
            onChange={handleChange}
          >
            <option>Genre</option>
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
            checked={formData.is_vinyl_only}
            onChange={handleChange}
          />
        </Form.Group>
        <div>
          <Form.Group>
            <Form.Label>Artists</Form.Label>
            <Select
              name='artists'
              onChange={(selected) => artistSelect(selected, 'artists')}
              options={selectOptions}
              isMulti
            />
          </Form.Group>
          <Button variant='primary' onClick={handleShow}>
            Add Artist
          </Button>

          <Modal show={show} onHide={handleClose}>
            <AddArtistForm 
              handleClose={handleClose}
            />
          </Modal>
        </div>

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