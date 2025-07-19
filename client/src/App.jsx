import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './authentication/Login'
import Register from './authentication/Register'
import { About } from './pages/About'
import { Home } from './pages/Home'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import DashboardLayout from './layouts/DashLayout'
import Analytics from './pages/Analytics'
import Transactions from './pages/Transactions'
import TransactionDetails from './pages/TransactionDetails'
import { useDispatch, useSelector } from 'react-redux'
import { fetchExpenses } from './redux/reducers/expenseSlice'
import { useEffect } from 'react'
import ScrollToTop from './layouts/ScrollToTop'
import ProtectedRoute from './ProtectedRoute'

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchExpenses())
    }
  })

  const RenderRoute = () => (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path="/transaction/:id" element={<TransactionDetails />} />

          <Route path='/settings' element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          } />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )

  return (
    <>
      {RenderRoute()}
    </>
  )
}

export default App