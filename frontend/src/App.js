import React from 'react'
// import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import RecordIndex from './components/RecordIndex'
import Navbar from './components/Navbar'
import SingleRecord from './components/SingleRecord'
import Register from './components/Register'
import Login from './components/Login'
import ArtistIndex from './components/ArtistIndex'
import SingleArtist from './components/SingleArtist'

const App = () => {

  // React.useEffect(() => {
  //   const getData = async () => {
  //     const res = await axios.get('/api/artists') // * <-- replace with your endpoint
  //     console.log(res.data)
  //   }
  //   getData()
  // })

  return (
  // <h1>Hello World</h1>

    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/records' component={RecordIndex}/>
        <Route exact path='/records/:id' component={SingleRecord}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/artists' component={ArtistIndex}/>
        <Route exact path='/artists/:id' component={SingleArtist}/>
      </Switch>
    </BrowserRouter>
  )

}

export default App
