import React from 'react';
import axios from 'axios'

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import './App.css';
import StockEventsTable from './components/StockEventsTable'
import AddStockEvent from './components/AddStockEvent'
import AddProduct from './components/AddProduct'
import Nav from './components/Nav'

class App extends React.Component{
  state = {
    products: [],
    stockEvents: [],
  }

  async componentDidMount(){

    const productsRes = await axios({
      method: 'GET',
      url: 'http://localhost:1337/products'
    })

    const stockEventsRes = await axios({
      method: 'GET',
      url: 'http://localhost:1337/stockevents'
    })
    console.log("App.componentDidMount stockEventsRes", stockEventsRes)

    const products = productsRes.data
    const stockEvents = stockEventsRes.data

    this.setState({products, stockEvents})
  }

  render(){
    console.log("App.render")
    const {products, stockEvents} = this.state

    return (
      <div className="App">
        <h1>Barcode</h1>

        <BrowserRouter>
          <Nav />
          <Switch>
            <Route exact path="/products">
              <AddProduct />
            </Route>

            <Route exact path="/stock/add">
              <AddStockEvent products={products} />
            </Route>

            <Route exact path="/stock">
              <StockEventsTable
                products={products}
                stockEvents={stockEvents}
              />
            </Route>

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
