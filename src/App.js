import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Personas from './Components/Personas';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact render= {()=> <Home /> }/>
        <Route path="/:id" exact render= {(routeProps)=> <Personas {...routeProps} /> }/>
      </div>
    </BrowserRouter>
  );
}

export default App;
