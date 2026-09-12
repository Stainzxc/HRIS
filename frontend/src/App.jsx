import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/auth/Login'
import Landing from './pages/Landing'
import Signup from './pages/auth/Signup'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
