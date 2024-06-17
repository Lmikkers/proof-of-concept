// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express()
const apiUrl = "https://fdnd-agency.directus.app/items/";
const apiHouse = `${apiUrl}f_houses`;
const apiHouseIMG = `${apiUrl}f_houses?fields=*,poster_image.id,poster_image.height,poster_image.width`;
const apiList = `${apiUrl}f_list`;
const apiUsers = `${apiUrl}f_users`;
const apiFeedback = `${apiUrl}f_feedback`;

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }))

// Homepage 
app.get('/', function (request, response) {
    fetchJson(apiHouse).then((housesDataUitDeAPI) => {
        response.render('home', {
            houses: housesDataUitDeAPI.data,
        })
    });
})

app.get('/favorites', function (request, response) {
    fetchJson(`${apiList}?filter={"title": {"_eq": "Mijn lijst (Ellenoor)"}}`).then((favorietenDataUitDeAPI) => {
        response.render('favorites', { favorieten: favorietenDataUitDeAPI.data })
    });
})

app.post('/', function (request, response) {
    fetchJson(`${apiList}?filter={"id":{"_eq":13}}`).then((favorietenDataUitDeAPI) => {
        const houses = favorietenDataUitDeAPI.data[0].houses;
        const addNewFavoriteHouse = houses.push(Number(request.body.house_id))
        fetch(`${apiList}/13`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json', // Set appropriate header
            },
            body: JSON.stringify({
                houses: houses
            }),
        }).then(tweederesponse => {
            // Handle the response from the server
            console.log('POST request response:', tweederesponse);
            response.redirect(303, '/')
        }).catch(error => {
            console.error('Error making POST request:', error);
        });
    })
})

app.get('/list', function (request, response) {
    fetchJson(`${apiList}?filter={"title": {"_eq": "Mijn lijst (Ellenoor)"}}&fields=*,houses.f_houses_id.*`).then((listDataUitDeAPI) => {
        console.log(listDataUitDeAPI.data)
        response.render('list', { lijst: listDataUitDeAPI.data[0] })
    });
})

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})



