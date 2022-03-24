import { NavLink } from "react-router-dom"
import { getWeather } from "../api/weather"
import styles from "../css/Navbar.module.css"
import { useEffect, useState } from "react"

const Navbar = () => {
    const [temp, setTemp] = useState()

    useEffect(() => {
        getWeather().then(setTemp)
    }, [])

    return (
        <nav className={styles.navbar}>
            <div className={styles.linkContainer}>
                <NavLink to="/">Wardrobe</NavLink>
                <NavLink to="/add">Add item</NavLink>
                {/* <NavLink to="/">{temp}</NavLink> */}
            </div>
        </nav>
    )
}

export default Navbar
