import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/AuthPage'
import ContactsPage from './pages/ContactsPage'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { isAuthenticated } from './utils/auth';

function App() {
  return (
    <Routes>
      {/* Redirecionamento da raiz */}
      <Route
        path="/"
        element={
          isAuthenticated() ? <Navigate to="/contatos" replace /> : <Navigate to="/auth" replace />
        }
      />

      {/* Página pública */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Página protegida */}
      <Route
        path="/contatos"
        element={
          <ProtectedRoute>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <ContactsPage />
              </main>
              <Footer />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App
