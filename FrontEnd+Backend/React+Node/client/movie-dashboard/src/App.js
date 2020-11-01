import './App.css';

function App() {

  fetch('http://localhost:3000/movieList', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(res => res.json()).then(data => console.log(data));

  return (
    <div>
      React App
    </div>
  );
}

export default App;
