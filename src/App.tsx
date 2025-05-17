import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/AuthPage'
import ContactsPage from './pages/ContactsPage'

function App() {

  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/contatos" element={<ContactsPage />} />
      </Routes>

    </>
  )
}

export default App
