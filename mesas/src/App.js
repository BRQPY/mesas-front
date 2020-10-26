import React from 'react'
import RestaurantesGrid from "./components/RestaurantesGrid"
import PerfilRestaurante from "./components/PerfilRestaurante"
import ReservasGrid from "./components/ReservasGrid"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"


function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <Switch>
            <Route path="/" exact component={RestaurantesGrid} />
            <Route path="/restaurante/perfil/:id" exact component={PerfilRestaurante} />
            <Route path="/reservas" exact component={ReservasGrid} />
            <Route component={() => (
              <div>
                <h1 className="center">Error404: NO EXISTE</h1>
              </div>
            )}
            />
          </Switch>
        </Router>
      </div>
    </div>

  )
}

export default App;