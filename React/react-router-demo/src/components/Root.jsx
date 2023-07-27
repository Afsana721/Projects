import { Link } from 'react-router-dom'


const Root = () => {
    return (
        <div>
            <ul>
            <li><Link to="/home">Home</Link></li>     {/*user link to click */}
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
           
          </ul>
        </div>
    )
}

export default Root;