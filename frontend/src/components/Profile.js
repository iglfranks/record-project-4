import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, OverlayTrigger, Tooltip, Figure, Button } from 'react-bootstrap'
import { getPayload, getTokenFromLocalStorage } from './helpers/auth'
import { useHistory } from 'react-router'
import RecordCard from './RecordCard'

const Profile = () => {

  const history = useHistory()

  const [userProfile, setUserProfile] = useState([])
  const [userFaves, setUserFaves] = useState([])
  const [hasError, setHasError] = useState(false)
  const [pp, setPp] = useState()


  useEffect(() => {
    const getData = async () => {
      try {
        const payload = getPayload()
        const { data } = await axios.get(`/api/auth/user/${payload.sub}`)
        setUserProfile(data)
      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [])

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

  const handleDelete = async (event) => {
    try {
      axios.delete(
        `/api/favourites/${event.target.id}/`,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      window.location.reload()
    } catch (err) {
      setHasError(true)
    }
  }

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
              <Row lg={3}>
                {userProfile.records.map(rec => {
                  return (
                    <Col key={rec.id}>
                      <RecordCard {...rec} />
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
                      <Col key={rec.id} id={rec.id} style={{
                        display: 'flex',
                      }}>
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
                        <Button onClick={handleDelete} id={rec.id} style={{
                          height: '40px',
                          borderRadius: '500px',
                          backgroundColor: 'rgba(71, 85, 209, 0.952)',
                          border: 'solid rgb(71, 85, 209)',
                          marginLeft: '10px',
                        }}>X</Button>
                      </Col>
                    )
                  })}
                </Row>
                :
                <Row lg={1}>
                  {hasError ?
                    <Col>
                      <h5>An Error has occured!</h5>
                    </Col>
                    :
                    <Col>
                      <h5>Loading...</h5>
                    </Col>
                  }
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