const searchBar = document.querySelector('#search')
searchBar.addEventListener('click', () => {
    const apiInput = document.querySelector('#api-key').value
    const addressInput = document.querySelector('#address').value
    const address = encodeURI(addressInput)
    console.log(address)
    
    
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${apiInput}`
    fetch(mapBoxUrl)
    .then(raw => raw.json())
    .then(data => {
        console.log(data)
        const latitude = data.features[0].center[1]
        const longitude = data.features[0].center[0]
        console.log(latitude, longitude)
        const norad = document.querySelector('#norad').value
        const noradUrl = `https://satellites.fly.dev/passes/${norad}?lat=${latitude}&lon=${longitude}&limit=1&days=15&visible_only=true`
        
        
        fetch(noradUrl)
        .then(rawData => rawData.json())
        .then(data => {
            console.log(data)
            const culminate = data[0].culmination.utc_datetime
            const rise = data[0].rise.utc_datetime
            const set = data[0].set.utc_datetime
            const convert = date => {
                var newDate = new Date(date);
                return newDate;
            }
            
            
            const coolio = document.querySelector('.coolio')
            const tranny = document.createElement('div')
            tranny.className = 'coolio'
            tranny.innerHTML = `<p>Culminate Date & Time: <br> <br>${convert(culminate)}</p><br>`
            coolio.append(tranny)
            
            const dododo = document.createElement('div')
            dododo.className = 'dododo'
            dododo.innerHTML = `<p>Rise Date & Time: <br> <br>${convert(rise)}</p><br>`
            coolio.append(dododo)
            
            const cool = document.createElement('div')
            cool.className = 'cool'
            cool.innerHTML = `<p>Set Date & Time: <br> <br>${convert(set)}</p><br>`
            coolio.append(cool)
            
            const ending = document.querySelector('#delete')
            ending.addEventListener('click', () => {
                let apiInput = document.querySelector('#api-key')
                let addressInput = document.querySelector('#address')
                let norad = document.querySelector('#norad')
                
                
                apiInput.value = ''
                addressInput.value = ''
                norad.value = ''
                tranny.innerHTML = ''
                dododo.innerHTML = ''
                cool.innerHTML = ''
            }) 
        })
    })
})