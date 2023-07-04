
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup'
import Signin from './components/Signin'
import Success from './components/Success'
function App() {

  return (
    <>
      
   
      <Routes>
    <Route path='/' element={<Signup />} />
    <Route path='/signin' element={   <Signin />} />
    <Route path='/success' element={   <Success />} />
  </Routes>
    </>
  )
}

export default App
