// importare queste pagine in App.js
// poi in base al path (percorso) mostreremo ogni component (pagina) usando react-router components

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TopNav from "./components/TopNav";
import PrivateRoute from "./components/PrivateRoute";
//components
import Home from "./prenotazione/Home";
import Login from "./autenticazione/Login";
import Registrati from "./autenticazione/Registrati";
import Dashboard from "./user/Dashboard";
import DashboardSeller from "./user/DashboardSeller";
import NewAuction from "./auctions/NewAuction";
import NewOffer from "./auctions/NewOffer";
import EditAuction from "./auctions/EditAuction";
import ViewAuction from "./auctions/ViewAuction";

// ** Creiamo la barra del menu di navigazione che chiameremo "TopNav" in modo da poter navigare facilmente tra le pagine
/* Scriviamolo in App.js prima di spostarlo nel suo componente */

function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <ToastContainer position="top-center" theme="dark" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registrati" component={Registrati} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/dashboard/seller"
          component={DashboardSeller}
        />

        <PrivateRoute exact path="/create" component={NewAuction} />
        <PrivateRoute exact path="/makeoffer/:id" component={NewOffer} />
        <PrivateRoute exact path="/auction/edit/:id" component={EditAuction} />
        <Route exact path="/auctions/:id" component={ViewAuction} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
