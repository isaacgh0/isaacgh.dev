import Home from './pages/home'
import Math from './pages/classroom/math'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

const Routing = () => {
  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='math' element={<Math />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Routing
