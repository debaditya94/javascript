const axios = require('axios');
const cheerio = require('cheerio');
const url = "https://www.imdb.com/search/title/?count=100&groups=top_1000&sort=user_rating";

fetchData(url).then( (res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const moviesList = $('body > #wrapper > #root > .pagecontent > .redesign > #main > .article > .lister.list.detail.sub-list > .lister-list > .lister-item.mode-advanced');
    moviesList.each(function() {
        // console.log(this);
        let title = $(this).find("div[class='lister-item-content'] > h3[class='lister-item-header'] > a").text().trim();
        console.log(title);
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