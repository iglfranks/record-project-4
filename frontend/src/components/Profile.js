import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, OverlayTrigger, Tooltip, Figure } from 'react-bootstrap'
import { getPayload } from './helpers/auth'
import { useHistory } from 'react-router'
import RecordCard from './RecordCard'

const Profile = () => {

  const history = useHistory()

  const [userId, setUserId] = useState()
  const [userProfile, setUserProfile] = useState([])
  const [userFaves, setUserFaves] = useState([])
  const [hasError, setHasError] = useState(false)
  const [pp, setPp] = useState()

  useEffect(() => {
    const userIsAuthenticated = () => {
      const payload = getPayload()
      console.log('->>>> PAYLOAD', payload)
      if (!payload) return false
      setUserId(payload.sub)
      console.log('sub_>>>', userId)
      return true
    }
    userIsAuthenticated()
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/auth/user/${userId}`)
        setUserProfile(data)
      } catch (err) {
        console.log(err)
        setHasError(true)
      }
    }
    getData()
  }, [userId])

  useEffect(() => {

    const settingPic = () => {
      if (!userProfile.profile_pic) {
        setPp('https://i.ibb.co/XscjRqG/plain-vinyl.jpg')
      } else {
        setPp(userProfile.profile_pic)
      }
    }
    settingPic()

    const settingFav = () => {
      setUserFaves(userProfile.favourites)
    }
    settingFav()

  }, [userProfile])

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  console.log(userFaves)
  return (
    <Container style={{ 
      width: '80%',
      marginTop: '45px',
      marginBottom: '45px',
    }}>
      {userProfile.length !== 0 ?
        
        <Row>

          <Col>
            <Card style={{ marginBottom: '20px' }}>
              <Card.Header>
                <Card.Img src={pp} />
              </Card.Header>
              <Card.Body>
                <Card.Title>{userProfile.username}</Card.Title>
                <Card.Text>{userProfile.first_name} {userProfile.last_name}</Card.Text>
              </Card.Body>
            </Card>
            <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
          </Col>

          <Col lg={7}>
            <h1>My Records</h1>
            <hr />
            <Container>
              <Row lg={4}>
                {userProfile.records.map(rec => {
                  return (
                    <Col key={rec.id}>
                      <RecordCard {...rec}/>
                    </Col>
                  )
                })}
              </Row>
            </Container>
          </Col>

          <Col>
            
            <Container>
              <h4 style={{ marginBottom: '20px' }}>Favourites</h4>
              {userFaves ?
                <Row lg={1}> 
                  {userFaves.map(rec => {
                    return (
                      <Col key={rec.id}>
                        <OverlayTrigger
                          placement='top'
                          overlay={
                            <Tooltip>{rec.record.title}</Tooltip>
                          }
                        >
                          <Card style={{ 
                            padding: '5px',
                            marginBottom: '10px',
                          }}>
                            <Link to={`/records/${rec.record.id}`}>
                              <Figure style={{ margin: '0' }}>
                                <Figure.Image
                                  src={rec.record.image}
                                  alt={`${rec.record.title} Cover`}
                                  id='record-single-pic'
                                  style={{ margin: '0' }}
                                />
                              </Figure>
                            </Link>
                          </Card>
                        </OverlayTrigger>

                      </Col>
                    )
                  })}
                </Row>
                :
                <Row>
                  <h1>loading</h1>
                </Row>
              }
              
            </Container>
          </Col>

        </Row>







        :
        <>
          {hasError ?
            <h1>Err</h1>
            :
            <h1>Loading</h1>
          }
        </>
      }
    </Container>
  )

}
export default Profile