import React from 'react'
import { Carousel, Figure } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomeCarousel = ({ id, image, title }) => {

  return (
    <Link to={`/records/${id}`} >
      <Figure>
        <Figure.Image
          src={image}
          alt={`${title} Cover Art`}
          id='record-single-pic'
          style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0, 0.8', borderRadius: '50%' }}
        />
      </Figure>
      <Carousel.Caption style={{ 
        top: '0',
        bottom: 'auto',
        color: 'white',
        backgroundColor: 'rgba(0,0,0, 0.4',
        borderRadius: '20px',
      }}>
        {title}
      </Carousel.Caption>
    </Link>
  )

}
export default HomeCarousel