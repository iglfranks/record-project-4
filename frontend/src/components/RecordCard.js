import React from 'react'
import { Link } from 'react-router-dom'

const RecordCard = ({ id, title, image, artists }) => {

  return (
    <div className='card border-dark'>
      <Link to={`/records/${id}`}>
        <img className='card-img-top' src={image} alt='Record Image' />
        <div className='card-footer border-dark text-decoration-none'>
          <h6 className='card-title cardInfo text-black'>{title}</h6>
          <h6 className='cardInfo text-black'>{artists[0].name}</h6>
        </div>
      </Link>
    </div>
  )

}
export default RecordCard