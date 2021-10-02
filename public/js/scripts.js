// API Key
const apiKey = '15628c27b4824a70aa6edbb8d0f65479';

// HTTP Request settings
const headers = new Headers();
const reqInit = { method: 'GET', headers: headers, mode: 'cors', cache: 'default'};

// Default news source
const defaultCountry = 'ie';

// moment.js import
const moment = require('moment');

// Asynchronous function to call API and get data 
// NOTE: Paramater value is default ( in case it goes missing)
async function getNewsData(country = defaultCountry) {
    // I changed the source to be by country, as to include different news sources
    let url = ""
    if(country !== "covid"){
        url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
        console.log("URL set to country")
    }else{
        url = `https://newsapi.org/v2/top-headlines?q=coronavirus&language=en&apiKey=${apiKey}`;
        console.log("URL set to covid")
    }
    try{

        // Call the api - Await indicates an Async call
        // this call is non blocking and will return a promise
        const response = await fetch(url, reqInit);

        // Get Json data from the response
        const json = await response.json();

        // Log raw Json result
        console.log(json);

        displayData(json.articles);

        // Log articles from Json
        console.log(json.articles);

        // Catch any errors
    } catch(err){
        console.log(err);
    }
}

// retrieveCountry() function which is activated when a page is loaded.
function retrieveCountry(){
    // A country is used as a key in a dictionary to retrieve the
    // appropriate country tag for the news source
    const dict = {
        "Poland": "pl",
        "Ireland": "ie",
        "United Kingdom": "gb",
        "China": "cn",
        "Coronavirus": "covid"
    };
    let country = document.getElementById("country").innerHTML;
    countryCode = dict[country];
    // getNewsData() is called with the country code passed as a parameter
    getNewsData(countryCode)
}

function formatTime(datetime) {
    let formattedTime = moment(datetime).format();
    console.log(formatTime);
    return formattedTime;
}

// Function accepts an array of news articles
// Articles are parsed and displayed
function displayData(articles) {
    console.log(articles);

    let output = articles.map(article => {
        // Returns a template for each article
        return `<article class="article"><a href='${article.url}'>
                    <h4 class="title">${article.title}</h4>
                    <p class="author">${article.author}</p>
                    <p class="published">${article.publishedAt}</p>
                    <img class="image" src=${article.urlToImage} alt='article image'>
                    <p class="desc">${article.description}</p>
                    </a>
                </article>`;
    });

    // Output the result of the previous step
    let articlesElement = document.getElementById('articles')
    articlesElement.innerHTML = output;

}
