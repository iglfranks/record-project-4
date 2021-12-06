import React from 'react'

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
            <a className='nav-link' href='/'>Home</a>
            <a className='nav-link' href='records'>Records</a>
            <a className='nav-link' href='#'>Artists</a>
          </div>
          <div className='navbar-nav navbar-text'>
            <a className='nav-link' href='#'>Register</a>
            <a className='nav-link' href='#'>Login</a>
          </div>
        </div>
      </div>
    </nav>
    // </div>
  )

}
export default Navbar