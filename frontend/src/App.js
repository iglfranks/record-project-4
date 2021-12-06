import React from 'react'
// import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import RecordIndex from './components/RecordIndex'
import Navbar from './components/Navbar'
import SingleRecord from './components/SingleRecord'

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
      </Switch>
    </BrowserRouter>
  )

}

export default App
