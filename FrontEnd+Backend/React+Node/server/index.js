const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://www.imdb.com/search/title/?count=100&groups=top_1000&sort=user_rating";
const fs = require('fs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const moviesData = require('./movie-list.json');

app.use(bodyParser.json());
app.use(cors());

fetchData(url).then( (res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const moviesList = $('body > #wrapper > #root > .pagecontent > .redesign > #main > .article > .lister.list.detail.sub-list > .lister-list > .lister-item.mode-advanced');
    const moviesListData = [];
    moviesList.each((index, elem) => {
        const title = $(elem).find("div[class='lister-item-content'] > h3[class='lister-item-header'] > a").text().trim();
        const releaseYear = $(elem).find("div[class='lister-item-content'] > h3[class='lister-item-header'] > span[class='lister-item-year text-muted unbold']").text().replace('(', ' ').replace(')', ' ').trim();
        const pgRating = $(elem).find("div[class='lister-item-content'] > p[class='text-muted '] > span[class='certificate']").text().trim();
        const genre = $(elem).find("div[class='lister-item-content'] > p[class='text-muted '] > span[class='genre']").text().trim();
        const runningTime = $(elem).find("div[class='lister-item-content'] > p[class='text-muted '] > span[class='runtime']").text().trim();
        const imdbRating = $(elem).find("div[class='lister-item-content'] > div[class='ratings-bar'] > div[class='inline-block ratings-imdb-rating'] > strong").text().trim();
        const metaScore = $(elem).find("div[class='lister-item-content'] > div[class='ratings-bar'] > div[class='inline-block ratings-metascore'] > span[class='metascore  favorable']").text().trim();
        const description = $(elem).find("div[class='lister-item-content'] > p[class='text-muted']").text().trim();
        const movieInfo = {
            title,
            releaseYear,
            genre,
            runningTime,
            pgRating,
            imdbRating,
            metaScore,
            description
        };
        moviesListData.push(movieInfo);
    });
    const fileData = JSON.stringify(moviesListData, null, 2);
    fs.writeFile('movie-list.json', fileData, (err) => {
        if (err) throw err;
        console.log('Movie data written to file');
    });
})

async function fetchData(url){
    console.log("Crawling data...")
    // make http call to url
    let response = await axios(url).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    return response;
}

app.get('/', (req, res) => {
    res.send(`<h1>Server running at port 3000</h1>`);
});

app.get('/movieList', (req, res) => {
    try{
        const queryList = req.query;
        let filteredMovies = [...moviesData];
        for (let key in queryList) {
            filteredMovies = filteredMovies.filter(movie => movie[key] == queryList[key]);
        };
        res.json(filteredMovies);
    }
    catch(err) {
        res.send('Error fetching data!')
    }
});

http.listen(3000, () => {
    console.log('Server running at port 3000');
});