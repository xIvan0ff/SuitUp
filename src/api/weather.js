const api = {
    key: "b94e53a435a10994c9f671ff48ecbc39",
    base: "https://api.openweathermap.org/data/2.5/",
}

export function getWeather() {
    return fetch(`${api.base}weather?q=Burgas&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
            console.log(result.main.temp)
            return result.main.temp
        })
}
