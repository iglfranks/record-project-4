import React from 'react'
import { Link } from 'react-router-dom'

const RecordCard = ({ id, title, image, artists }) => {

  return (
    <div className='card border-dark'>
      <Link to={`/records/${id}`}>
        <img className='card-img-top' src={image} alt='Record Image' />
        <div className='card-footer border-dark'>
          <h6 className='card-title'>{title}</h6>
          <h6>{artists[0].name}</h6>
        </div>
      </Link>
    </div>
  )

}
export default RecordCard