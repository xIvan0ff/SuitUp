import { useEffect } from "react"
import {
    getTemperatureByCity,
    getTemperatureByLatLon,
    getWeatherByLatLon
} from "../api/weather"
import OutfitPicker from "../components/OutfitPicker"
import Wardrobe from "../components/Wardrobe"

const Home = () => {
    useEffect(() => {
        if ("geolocation" in navigator) {
            console.log("Available")
        } else {
            console.log("Not Available")
        }
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude)
            console.log("Longitude is :", position.coords.longitude)
            getTemperatureByLatLon(
                position.coords.latitude,
                position.coords.longitude
            ).then((temp) => {
                console.log("Temp", temp)
            })
        })
    }, [])
    return (
        <div className="home">
            <h1>Suit Up</h1>
            <OutfitPicker />
            <Wardrobe />
        </div>
    )
}

export default Home
