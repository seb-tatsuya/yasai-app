import React from 'react'
import "./assets/reset.css"
import "./assets/style.css"
import Router from '../Router'
import { Header } from '../components/Header'

const App = () => {

  return (
    <>
      <Header />
      <main className='c-main'>
        <Router />
      </main>
    </>
  )
}

export default App;
