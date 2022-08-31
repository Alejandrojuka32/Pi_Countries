import './App.css';
import {Route, Switch} from "react-router-dom"
import LandingPage from "./Components/LandingPage"
import Cards from './Components/Cards';
import CountryDetail from './Components/CountryDetail';
import CreateActivity from './Components/CreateActivity';
import ActivitiesWithCountries from './Components/ActivitiesWithCountries';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={"/"} component={LandingPage}/>
        <Route exact path={"/Cards"} component={Cards}/>
        <Route exact path={`/countries/:Id`} component={CountryDetail}/>
        <Route exact path={"/countries/activities/new"} component={CreateActivity}/>
        <Route exact path={"/listactivities"} component={ActivitiesWithCountries}/>
      </Switch>
    </div>
  );
}

export default App;
