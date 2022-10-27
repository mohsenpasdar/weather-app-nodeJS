const request = require('request')

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=424f83dea0dc3f1072dcad218503cbcc&query=${encodeURIComponent(address)}&limit=1`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the geocoding service!', undefined)
        } else if (body.error) {
            callback('Query must have at least 3 characters. Try another search!', undefined)
        } else if (body.data.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            callback(undefined, {
                latitude: body.data[0].latitude, 
                longitude: body.data[0].longitude,
                location: body.data[0].label
            })
        }
    })
}

module.exports = geocode