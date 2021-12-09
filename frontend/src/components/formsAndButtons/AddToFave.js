import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import { Button, Overlay, Tooltip } from 'react-bootstrap'
import { getTokenFromLocalStorage } from '../helpers/auth'

const AddToFave = () => {

  const [abled, setAbled] = useState()
  const [show, setShow] = useState(false)
  const target = useRef(null)

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
      await axios.post('/api/favourites/', 
        formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      setAbled('disabled')
      setShow(true)
    } catch (err) {
      console.log(err)
    }
  } 

  console.log(formData)
  return (
    <>
      <Button ref={target} className={abled} variant='primary' onClick={handleAddFave}>Fave</Button>
      <Overlay target={target.current} show={show} placement='bottom'>
        {(props) => (
          <Tooltip {...props}>
            Added!
          </Tooltip>
        )}
      </Overlay>
    </>
  )

}
export default AddToFave