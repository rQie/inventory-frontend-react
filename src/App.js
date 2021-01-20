import React from 'react';
import axios from 'axios'

import './App.css';
import StockEventsTable from './components/StockEventsTable'

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

        <StockEventsTable
          products={products}
          stockEvents={stockEvents}
        />

      </div>
    );
  }
}

export default App;
