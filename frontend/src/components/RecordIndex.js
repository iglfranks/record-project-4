import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'
import RecordCard from './RecordCard'

const RecordIndex = () => {

  const [records, setRecords] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/records')
        setRecords(data)
        // console.log(records)
      } catch (err) {
        console.log(err)
        setHasError(true)
        // console.log(hasError)
      }

    }
    getData()
  }, [])

  console.log(hasError)

  return (
    <section>
      <div className='container-md my-4'>
        <div className='row row-cols-4'>
          {records.map(record => {
            console.log(record.artists[0])
            return (
              <div key={record.id} className='col mb-3'>
                <RecordCard key={record.id} {...record} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default RecordIndex