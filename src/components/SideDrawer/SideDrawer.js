import React from 'react'
import './SideDrawer.css'
import { Link } from 'react-router-dom'

const SideDrawer = (props) => {
    let drawerClasses = ['side-drawer']
    if (props.show) {
        drawerClasses = ['side-drawer open']
    }
    return (
        <nav className={drawerClasses}>
            <ul>

                <li>
                    <Link to="/">Products</Link>
                </li>
                <li><Link to="/account">My Account</Link></li>
                <li><Link to="/cart">Cart <i className="fas fa-shopping-cart"></i></Link></li>

            </ul>
        </nav>
    )
}

export default SideDrawer