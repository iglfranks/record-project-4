import React, { useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { getPayload } from './helpers/auth'
import { Button } from 'react-bootstrap'


const Navbar = () => {

  const location = useLocation()
  const history = useHistory()

  useEffect(() => {

  }, [location.pathname])

  const userIsAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return false
    return true
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  console.log(userIsAuthenticated())
  return (
    <nav className='navbar navbar-dark bg-dark navbar-expand-lg sticky-top'>
      <div className='container-fluid mainNavDiv'>
        <a className='navbar-brand' href='/'>Record-id</a>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className='collapse navbar-collapse d-flex justify-content-between'>
          <div className='navbar-nav'>
            <Link to='/' className='nav-link'>Home</Link>
            <Link to='/records' className='nav-link'>Records</Link>
            <Link to='/artists' className='nav-link'>Artists</Link>
            {!userIsAuthenticated() ?
              <div></div>
              :
              <>
                <Link to='/addrecord' className='nav-link btn btn-primary text-white' style={{
                  backgroundColor: 'rgba(71, 85, 209, 0.952)',
                  border: 'solid rgb(71, 85, 209)',
                  marginLeft: '20px',
                }}>Add A Record</Link>
              </>
            }
          </div>
          <div className='navbar-nav navbar-text d-flex'>

            {!userIsAuthenticated() ?
              <>
                <Link to='/register' className='nav-link'>Register</Link>
                <Link to='/login' className='nav-link'>Login</Link>
              </>
              :
              <>
                <Link to='/profile' className='nav-link'>Profile</Link>
                <Button className='btn btn-primary' onClick={handleLogout}
                  style={{
                    backgroundColor: 'rgba(71, 85, 209, 0.952)',
                    border: 'solid rgb(71, 85, 209)',
                    marginLeft: '20px',
                  }}>Logout</Button>
              </>


            }

          </div>
        </div>
      </div>
    </nav>
    // </div>
  )

}
export default Navbar