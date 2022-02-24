import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { NavigationBar } from './components/NavigationBar';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import './App.css';

function App() {
  const [columnDefs] = useState([
    { field: 'symbol', sortable:true, filter:true },
    { field: 'currentPrice' },
    { field: 'name' },
    { field: 'quantity' },
    { field: 'realizedPnl' },
    { field: 'unrealizedPnl' },
    { field: 'totalPnl' },
  ])
  const [rowData, setRowData] = useState([]);

  const getPositions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/trading/v1/position');
      const data = await response.json();
      console.log({ data });
      setRowData(data);
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
      getPositions();
     }, []);

  return (
    <div className="App">
    <React.Fragment>
        <NavigationBar />
    </React.Fragment>
    <div className="GridContainer">
    <div className="ag-theme-alpine-dark" style={{width: '100%', height:850}}>
           <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
     </div>
    </div> 
  );
}

export default App;