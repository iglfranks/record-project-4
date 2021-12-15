import React from 'react'
import { Link } from 'react-router-dom'

const ArtistCard = ({ id, name, image }) => {

  return (
    <div className='card border-dark'>
      <Link to={`/artists/${id}`}>
        <img className='card-img-top' src={image} alt='Record Image' />
        <div className='card-footer border-dark'>
          <h6 className='card-title cardInfo text-black'>{name}</h6>
        </div>
      </Link>
    </div>
  )

}
export default ArtistCard