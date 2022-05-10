const api = {
    key: "b94e53a435a10994c9f671ff48ecbc39",
    base: "https://api.openweathermap.org/data/2.5/"
}

export function getWeatherDataByCity(city = "Burgas") {
    return fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
            console.log(result.main.temp)
            return result
        })
}

export function getWeatherDataByLatLon(lat, lon) {
    return fetch(
        `${api.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`
    )
        .then((res) => res.json())
        .then((result) => {
            console.log(result.main.temp)
            return result
        })
}

export function getTemperatureByCity(city = "Burgas") {
    return getWeatherDataByCity(city).then((result) => result.main.temp)
}

export function getHumidityByCity(city = "Burgas") {
    return getWeatherDataByCity(city).then((result) => result.main.humidity)
}

export function getTemperatureByLatLon(lat, lon) {
    return getWeatherDataByLatLon(lat, lon).then((result) => result.main.temp)
}
