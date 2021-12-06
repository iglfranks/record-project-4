import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import ArtistCard from './ArtistCard'

const ArtistIndex = () => {

  const [artists, setArtists] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/artists')
        setArtists(data)
        // console.log(records)
      } catch (err) {
        console.log(err)
        setHasError(true)
        // console.log(hasError)
      }

    }
    getData()
  }, [])


  console.log(artists)
  console.log(hasError)
  return (
    <section>
      <div className='container-md my-4'>
        <div className='row row-cols-4'>
          {artists.map(artist => {
            return (
              <div key={artist.id} className='col mb-3'>
                <ArtistCard key={artist.id} {...artist} />

                

              </div>
            )
          })}
        </div>
      </div>
    </section>
  )

}
export default ArtistIndex