console.log('Hier komt je server voor Sprint 12.')

// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// Maak een nieuwe express app aan
const app = express(),
      baseUrl = 'https://fdnd-agency.directus.app/',
      apiUrl = 'https://fdnd-agency.directus.app/items/frd_site';

// Endpoints 

// New 13-06
const nieuwekijkScans = await fetchJson('https://fdnd-agency.directus.app/items/frd_site?filter[scans][_eq]=11&fields=id,title,scans.*')

const fetchAllScans = async () => {
    return await fetchJson('https://fdnd-agency.directus.app/items/frd_scans');
};

const fetchSites = async () => {
    return await fetchJson('https://fdnd-agency.directus.app/items/frd_site');
};

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))

// 🗺️ ROUTES > AANMAKEN VOOR DE ACCESDASH
// Home route
app.get('/', async function (request, response) {
    try {
        const sitesResponse = await fetchSites(),
              sites = sitesResponse.data; // Haal de 'data' eigenschap eruit
        console.log('Fetched sites:', sites); // Log de opgehaalde sites

        response.render('index', {
            sites: sites
        });
    } catch (error) {
        response.status(500).send('Er is een fout opgetreden');
    }
});

// Define the formatDate function
function formatDate(dateString) {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[date.getMonth()];
}

// Detail route
app.get('/site/:id', async function (request, response) {
    try {
        const siteId = parseInt(request.params.id),
              allScansResponse = await fetchAllScans(),
              allScans = allScansResponse.data,
              sitesResponse = await fetchSites(),
              sites = sitesResponse.data;

        console.log('Site id:', siteId);

        // Vind de site met de gegeven id
        const site = sites.find(s => s.id === siteId);

        if (!site) {
            return response.status(404).send('Site not found');
        }

        // Filter de scans die bij deze site horen
        const siteScans = allScans.filter(scan => site.scans.includes(scan.id));
        console.log('Fetched site scans:', siteScans);

        response.render('detail', {
            site: site,
            scans: siteScans,
            formatDate
        });
    } catch (error) {
        response.status(500).send('Er is een fout opgetreden');
    }
});

// 🚧 POST > AANMAKEN ALS DIE ER MOET KOMEN

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
