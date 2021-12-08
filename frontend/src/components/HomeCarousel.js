import React from 'react'
import { Carousel, Figure } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomeCarousel = ({ id, image, title }) => {

  return (
    <Link to={`/records/${id}`} >
      <Figure style={{
        boxShadow: '0 4px 16px 0 rgba(0,0,0, 0.8',
        backgroundRepeat: 'no-repeat',

      }}>
        <Figure.Image
          src={image}
          alt={`${title} Cover Art`}
          id='record-single-pic'
        />
      </Figure>
      <Carousel.Caption>{title}</Carousel.Caption>
    </Link>
  )

}
export default HomeCarousel