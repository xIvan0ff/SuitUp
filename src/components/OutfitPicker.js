import { ClothesContext } from "../contexts/ClothesContext"
import { useContext, useState, useEffect } from "react"
import styles from "../css/OutfitPicker.module.css"
import OutfitDisplay from "./OutfitDisplay"
import { v4 as uuidv4 } from "uuid"
import {
    getHumidityByCity,
    getTemperatureByCity,
    getWeatherByCity
} from "../api/weather"
import { colorsArray } from "../data/colors"

const OutfitPicker = () => {
    const { clothes } = useContext(ClothesContext)
    const tShirts = clothes.filter((item) => item.type === "tShirt")
    const shirts = clothes.filter((item) => item.type === "shirt")
    const sweaters = clothes.filter((item) => item.type === "sweater")
    const trousers = clothes.filter((item) => item.type === "trousers")
    const shorts = clothes.filter((item) => item.type === "shorts")
    const jackets = clothes.filter((item) => item.type === "jacket")
    const shoes = clothes.filter((item) => item.type === "shoes")
    const accessories = clothes.filter((item) => item.type === "accessory")

    const checkIfRandomOutfitNeedsUpdate = () => {
        const localData = localStorage.getItem("randomOutfit")
        if (localData) {
            const localDataArray = JSON.parse(localData)
            const now = new Date().getTime()
            const arrayTime =
                localDataArray[localDataArray.length - 1].timestamp
            const diff = now - arrayTime
            const millisecIn12H = 1000 * 60 * 60 * 12
            if (diff > millisecIn12H) {
                return null
            } else {
                return localDataArray
            }
        } else {
            return null
        }
    }

    const [outfitItems, setOutfitItems] = useState([])
    const [randomOutfit, setRandomOutfit] = useState(
        checkIfRandomOutfitNeedsUpdate()
    )

    const [temp, setTemp] = useState()
    const [humidity, setHumidity] = useState()

    useEffect(() => {
        getTemperatureByCity().then(setTemp)
        getHumidityByCity().then(setHumidity)
    }, [])

    const handleChange = (e) => {
        console.log(e.target.value)
        const index = outfitItems.indexOf(e.target.value)
        if (index !== -1) {
            setOutfitItems(
                outfitItems.filter((item) => item !== e.target.value)
            )
        } else {
            setOutfitItems((prevState) => [e.target.value, ...prevState])
        }
    }

    const getRandomItem = (itemList) =>
        itemList[Math.floor(Math.random() * itemList.length)]

    const pickOutfitAccordingToTemp = (e) => {
        e.preventDefault()
        const someOutfit = []
        const randColor = getRandomItem(colorsArray)

        if (temp < 11) {
            someOutfit.push(getRandomItem(tShirts))
            someOutfit.push(getRandomItem(jackets))
        } else {
            someOutfit.push(getRandomItem(shirts))
        }

        if (temp < 18) {
            someOutfit.push(getRandomItem(trousers))
        } else {
            someOutfit.push(getRandomItem(shorts))
        }

        if (temp < 8) {
            someOutfit.push(getRandomItem(sweaters))
        }

        if (temp < 3) {
            someOutfit.push(getRandomItem(accessories))
        }
        someOutfit.push(getRandomItem(shoes))
        console.log(someOutfit)
        setRandomOutfit([
            ...someOutfit,
            { timestamp: new Date().getTime(), id: uuidv4() }
        ])
    }

    const pickNewOutfit = (e) => {
        e.preventDefault()
        const someOutfit = []

        if (outfitItems.includes("tShirt")) {
            someOutfit.push(getRandomItem(tShirts))
        }
        if (outfitItems.includes("shirt")) {
            someOutfit.push(getRandomItem(shirts))
        }
        if (outfitItems.includes("sweater")) {
            someOutfit.push(getRandomItem(sweaters))
        }
        if (outfitItems.includes("trousers")) {
            someOutfit.push(getRandomItem(trousers))
        }
        if (outfitItems.includes("shorts")) {
            someOutfit.push(getRandomItem(shorts))
        }
        if (outfitItems.includes("jacket")) {
            someOutfit.push(getRandomItem(jackets))
        }
        if (outfitItems.includes("shoes")) {
            someOutfit.push(getRandomItem(shoes))
        }
        if (outfitItems.includes("accessory")) {
            someOutfit.push(getRandomItem(accessories))
        }
        console.log(someOutfit)
        setRandomOutfit([
            ...someOutfit,
            { timestamp: new Date().getTime(), id: uuidv4() }
        ])
    }

    useEffect(() => {
        if (randomOutfit) {
            localStorage.setItem("randomOutfit", JSON.stringify(randomOutfit))
        }
    }, [randomOutfit])

    return (
        <div className={styles.outfitContainer}>
            <p className={styles.lead}>What do you want to wear today?</p>
            <form onSubmit={pickNewOutfit}>
                <label className={styles.checkboxContainer} htmlFor="tShirt">
                    T-shirt
                    <input
                        type="checkbox"
                        id="tShirt"
                        name="tShirt"
                        value="tShirt"
                        onChange={handleChange}
                    />
                    <span className={styles.checkmark}></span>
                </label>
                <label className={styles.checkboxContainer} htmlFor="shirt">
                    Shirt
                    <input
                        type="checkbox"
                        id="shirt"
                        name="shirt"
                        value="shirt"
                        onChange={handleChange}
                    />
                    <span className={styles.checkmark}></span>
                </label>
                <label className={styles.checkboxContainer} htmlFor="sweater">
                    Sweater
                    <input
                        type="checkbox"
                        id="sweater"
                        name="sweater"
                        value="sweater"
                        onChange={handleChange}
                    />
                    <span className={styles.checkmark}></span>
                </label>
                <label className={styles.checkboxContainer} htmlFor="trousers">
                    Trousers
                    <input
                        type="checkbox"
                        id="trousers"
                        name="trousers"
                        value="trousers"
                        onChange={handleChange}
                    />
                    <span className={styles.checkmark}></span>
                </label>
                <label className={styles.checkboxContainer} htmlFor="shorts">
                    Shorts
                    <input
                        type="checkbox"
                        id="shorts"
                        name="shorts"
                        value="shorts"
                        onChange={handleChange}
                    />
                    <span className={styles.checkmark}></span>
                </label>
                <label className={styles.checkboxContainer} htmlFor="shoes">
                    Shoes
                    <input
                        type="checkbox"
                        id="shoes"
                        name="shoes"
                        value="shoes"
                        onChange={handleChange}
                    />
                    <span className={styles.checkmark}></span>
                </label>
                <label className={styles.checkboxContainer} htmlFor="accessory">
                    Accessory
                    <input
                        type="checkbox"
                        id="accessory"
                        name="accessory"
                        value="accessory"
                        onChange={handleChange}
                    />
                    <span className={styles.checkmark}></span>
                </label>
                <div className={styles.btnContainer}>
                    <button type="sumbit">Get new outfit!</button>
                </div>
            </form>
            {temp && (
                <p className={styles.lead} style={{ marginTop: 50 }}>
                    Current temperature in Burgas is {temp}°C and humidity is{" "}
                    {humidity}
                </p>
            )}
            <form on onSubmit={pickOutfitAccordingToTemp}>
                <div className={styles.btnContainer}>
                    <button type="sumbit">
                        Get outfit based on temperature!
                    </button>
                </div>
            </form>
            <div>{randomOutfit && <OutfitDisplay outfit={randomOutfit} />}</div>
        </div>
    )
}

export default OutfitPicker
