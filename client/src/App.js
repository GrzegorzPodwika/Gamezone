import "./App.css";
import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import AppProvider from "./AppProvider";
import { Switch, Route } from "react-router-dom";
import Games from "./components/games/Games";
import Login from "./components/account/Login";
import Error from "./Error";
import Register from "./components/account/Register";
import UserProfile from "./components/users/UserProfile";
import Users from "./components/users/Users";
import UserGames from "./components/games/UserGames";
import "antd/dist/antd.css";
import "semantic-ui-css/semantic.min.css";
import AddGame from "./components/games/AddGame";
import { PrivateRoute } from "./PrivateRoute";
import { Role } from "./helpers/Role";

function App() {
  return (
    <div>
      <AppProvider>
        <Navigation />
        <div className="content-app">
          <Switch>
            <Route exact path="/" component={Games} />
            <PrivateRoute
              path="/users"
              component={Users}
              roles={[Role.Admin]}
            />
            <PrivateRoute
              path="/mygames"
              component={UserGames}
              roles={[Role.Admin, Role.User]}
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute
              path="/myprofile"
              component={UserProfile}
              roles={[Role.Admin, Role.User]}
            />
            <PrivateRoute
              path="/addgame"
              component={AddGame}
              roles={[Role.Admin]}
            />
            <Route path="*" component={Error} />
          </Switch>
        </div>
      </AppProvider>
    </div>
  );
}

export default App;
