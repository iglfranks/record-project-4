/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios'
import { Form, Figure } from 'react-bootstrap'

// const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
const uploadUrl = 'https://api.cloudinary.com/v1_1/iglfranks/image/upload'
// const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
const uploadPreset = 'yn8bfwwz'

const ImageUploadField = ({ handleImageUrl, value }) => {

  const handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const response = await axios.post(uploadUrl, data)
    handleImageUrl(response.data.url)
  }

  return (
    <>
      {value ?
        <Figure>
          <Figure.Image
            src={value}
            alt='Cover Art'
            id='image-upload-preview'
          />
        </Figure>
        :
        <>
          <Form.Control
            className='input'
            type='file'
            onChange={handleUpload}
          />
        </>
      }
    </>
  )

}
export default ImageUploadField