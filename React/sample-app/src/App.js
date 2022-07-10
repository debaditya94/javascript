import './App.css';
import { Link } from 'react-router-dom';
import { Component1 } from './components/component1';
import { Component2 } from './components/component2';

function App() {
  return (
    <div className="App">
      Hello world!
      <Component1/>
      <Component2/>
      <nav
        //  style={{
        //   borderBottom: "solid 1px",
        //   paddingBottom: "1rem",
        // }}
      >
        <div><Link to="/invoices">Invoices</Link></div>
        <div><Link to="/expenses">Expenses</Link></div>
      </nav>
    </div>

  );
}

export default App;
