import React, { useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { getPayload } from './helpers/auth'


const Navbar = () => {

  const location = useLocation()
  const history = useHistory()

  useEffect(() => {

  }, [location.pathname])

  const userIsAuthenticated = () => {
    const payload = getPayload()
    console.log('->>>> PAYLOAD', payload)
    if (!payload) return false
    return true
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  console.log(userIsAuthenticated())
  return (
    // <div className='container-fluid'>
    <nav className='navbar navbar-dark bg-dark navbar-expand-lg sticky-top'>
      <div className='container-fluid mainNavDiv'>
        <a className='navbar-brand' href='#'>Navbar</a>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className='collapse navbar-collapse'>
          <div className='navbar-nav'>
            <Link to='/' className='nav-link'>Home</Link>
            <Link to='/records' className='nav-link'>Records</Link>
            <Link to='/artists' className='nav-link'>Artists</Link>
          </div>
          <div className='navbar-nav navbar-text'>
            {/* <Link to='/register' className='nav-link'>Register</Link>
            <Link to='/login' className='nav-link'>Login</Link> */}

            {!userIsAuthenticated() ?
              <>
                <Link to='/register' className='nav-link'>Register</Link>
                <Link to='/login' className='nav-link'>Login</Link>
              </>
              :
              <>
                <Link to='/profile' className='nav-link'>Profile</Link>
                <Link to='/addrecord' className='nav-link btn btn-primary text-white'>Add A Record</Link>
                
                <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
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