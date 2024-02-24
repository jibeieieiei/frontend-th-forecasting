import { Link } from 'react-router-dom'
// import './index.css'

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/compare">Compare</Link>
      {/* <Link to="#">Blog</Link> */}
      {/* <Link to="#">Contact</Link> */}
    </nav>
  )
}

export default NavBar
