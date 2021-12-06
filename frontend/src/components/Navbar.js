import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

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
            <Link to='/register' className='nav-link'>Register</Link>
            <Link to='/login' className='nav-link'>Login</Link>
          </div>
        </div>
      </div>
    </nav>
    // </div>
  )

}
export default Navbar