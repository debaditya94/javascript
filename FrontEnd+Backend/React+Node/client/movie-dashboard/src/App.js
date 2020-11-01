import './App.css';
import React from 'react';

const movieListUrl = 'http://localhost:3000/movieList';
const filterValuesUrl = 'http://localhost:3000/filterParams';

class App extends React.Component {

  state = {
    movieList: [],
    title: '',
    releaseYear: '',
    genre: '',
    runningTime: '',
    pgRating: '',
    imdbRating: '',
    metaScore: '',
    titleList: [],
    releaseYearList: [],
    genreList: [],
    runningTimeList: [],
    pgRatingList: [],
    imdbRatingList: [],
    metaScoreList: [],
  };

  componentDidMount() {

    // const movieList = [];
    fetch(filterValuesUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json()).then(data => {

      const titleList = data.titleList;
      const releaseYearList = data.releaseYearList;
      const genreList = data.genreList;
      const runningTimeList = data.runningTimeList;
      const pgRatingList = data.pgRatingList;
      const imdbRatingList = data.imdbRatingList;
      const metaScoreList = data.metaScoreList;

      this.setState({titleList, releaseYearList, genreList, runningTimeList, pgRatingList, imdbRatingList, metaScoreList});
    });
    fetch(movieListUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json()).then(data => {

      this.setState({movieList: data});
    });
  }

  filterMovies() {
    const state = {...this.state};
    let movieFetchUrl = movieListUrl;
    if(state.genre || state.imdbRating || state.metaScore || state.pgRating || state.releaseYear || state.runningTime
      || state.title )  movieFetchUrl = movieFetchUrl + '?';
      if(state.genre) movieFetchUrl = movieFetchUrl + `genre=${state.genre}&`;
      if(state.imdbRating) movieFetchUrl = movieFetchUrl + `imdbRating=${state.imdbRating}&`;
      if(state.metaScore) movieFetchUrl = movieFetchUrl + `metaScore=${state.metaScore}&`;
      if(state.pgRating) movieFetchUrl = movieFetchUrl + `pgRating=${state.pgRating}&`;
      if(state.releaseYear) movieFetchUrl = movieFetchUrl + `releaseYear=${state.releaseYear}&`;
      if(state.runningTime) movieFetchUrl = movieFetchUrl + `runningTime=${state.runningTime}&`;
      if(state.title) movieFetchUrl = movieFetchUrl + `title=${state.title}&`;
      
      fetch(movieFetchUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(res => res.json()).then(data => {
  
        this.setState({movieList: data});
      });
  }

  render() {
    const state = {...this.state};
    const movieList = [...this.state.movieList];
    const titleList = [...this.state.titleList];
    const releaseYearList = [...this.state.releaseYearList];
    const genreList = [...this.state.genreList];
    const runningTimeList = [...this.state.runningTimeList];
    const pgRatingList = [...this.state.pgRatingList];
    const imdbRatingList = [...this.state.imdbRatingList];
    const metaScoreList = [...this.state.metaScoreList];

    const movieListDisplay = movieList.map((movie, index) => {
      return (<li key={index}>{movie.title}</li>)
    });
  
    return (
      <div>
        <div style={{textAlign: "center"}}>Filter by</div>
        <div>
          <label> Title : </label>
          <select placeholder='Title' value={state.title} onChange={event => this.setState({title: event.target.value})}>
            <option value='' key=''>All</option>
    {titleList.map(title => <option  key={Math.random()} value={title}> {title}</option>)}
          </select>
          <label> Genre : </label>
          <select placeholder='Genre' value={state.genre} onChange={event => this.setState({genre: event.target.value})}>
          <option value='' key=''>All</option>
    {genreList.map(genre => <option  key={Math.random()} value={genre}> {genre}</option>)}
          </select>
          <label> Release Year : </label>
          <select placeholder='Release Year' value={state.releaseYear} onChange={event => this.setState({releaseYear: event.target.value})}>
          <option value='' key=''>All</option>
    {releaseYearList.map(releaseYear => <option  key={Math.random()} value={releaseYear}> {releaseYear}</option>)}
          </select>
          <label> Running Time : </label>
          <select placeholder='Running Time' value={state.runningTime} onChange={event => this.setState({runningTime: event.target.value})}>
          <option value='' key=''>All</option>
    {runningTimeList.map(runningTime => <option  key={Math.random()} value={runningTime}> {runningTime}</option>)}
          </select>
          <label> PG Rating : </label>
          <select placeholder='PG Rating' value={state.pgRating} onChange={event => this.setState({pgRating: event.target.value})}>
          <option value='' key=''>All</option>
    {pgRatingList.map(pgRating => <option  key={Math.random()} value={pgRating}> {pgRating}</option>)}
          </select>
          <label> IMDb Rating : </label>
          <select placeholder='IMDb Rating' value={state.imdbRating} onChange={event => this.setState({imdbRating: event.target.value})}>
          <option value='' key=''>All</option>
    {imdbRatingList.map(imdbRating => <option  key={Math.random()} value={imdbRating}> {imdbRating}</option>)}
          </select>
          <label> Meta Score : </label>
          <select placeholder='Meta Score' value={state.metaScore} onChange={event => this.setState({metaScore: event.target.value})}>
          <option value='' key=''>All</option>
    {metaScoreList.map(metaScore => <option  key={Math.random()} value={metaScore}> {metaScore}</option>)}
          </select>
          <button onClick={this.filterMovies.bind(this)}>Go</button>
        </div>
        <ul>
          {movieListDisplay}
        </ul>
      </div>
    );
  }
  }

export default App;
