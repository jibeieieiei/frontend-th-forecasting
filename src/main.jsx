import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Forecasting from './pages/Forecasting/Forecasting.jsx'
import Information from './pages/Information/Information.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Forecasting />,
  },
  {
    path: '/information',
    element: <Information />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // <App />
  <RouterProvider router={router} />
  // /* </React.StrictMode>, */
)
