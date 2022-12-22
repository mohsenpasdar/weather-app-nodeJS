const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const currentLocationButton = document.querySelector('#current-location')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})

currentLocationButton.addEventListener('click', () => {
    console.log('clicked');
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!')
    }

    currentLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        currentLocationButton.removeAttribute('disabled')

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch(`/weather?lat=${lat}&lon=${lon}`).then(response => {
            response.json().then(data => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })

    
    



})