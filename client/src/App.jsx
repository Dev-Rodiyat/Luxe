import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './authentication/Login'
import Register from './authentication/Register'
import About from './pages/About'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import ScrollToTop from './layouts/ScrollToTop'
import ProtectedRoute from './ProtectedRoute'
import FAQ from './pages/FAQ'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import { getCart } from './redux/reducers/cartSlice'
import CreateProduct from './pages/CreateProduct'
import CreateOrder from './pages/CreateOrder'

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(getCart());
    }
  }, [dispatch, user]);

  const RenderRoute = () => (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<CreateProduct />} />
        <Route path="/add-order" element={<CreateOrder />} />

        {/* <Route element={<ProtectedRoute />}></Route> */}

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