import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

const AddToFave = () => {

  const { id } = useParams()
  const [formData, setFormData] = useState({
    record: '',
  })

  useEffect(() => {
    setFormData({
      record: parseInt(id),
    })
  }, [id])

  const handleAddFave = async () => {
    try {
      await axios.post('/api/favourites/', formData)
    } catch (err) {
      console.log(err)
    }
  } 

  console.log(formData)
  return (
    <button className='btn btn-primary' onClick={handleAddFave}>Fave</button>
  )

}
export default AddToFave