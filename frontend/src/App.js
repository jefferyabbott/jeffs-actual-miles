
import {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [loading, setLoading] = useState(true);
  const [distanceData, setDistanceData] = useState([]);

  async function getData() {
    await axios("https://backend.jeffsactualmiles.com")
    .then((response) => {
      setDistanceData(response.data);
      setLoading(false);
    })
    
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) { 
    return "Loading...";
  } else {

    const totalMiles = distanceData.reduce((total, event) => event.exercise === 'outdoor run' || event.exercise === 'orange theory' ? total + event.distance : total, 0).toFixed(2);

    return (
      <div className="container">
        <h1 id="title">Jeff's Actual Miles</h1>

        <div id="totalMiles" className="display-1 align-items-center">
          {totalMiles}
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Distance (miles)</th>
            </tr>
          </thead>
          <tbody>
          {distanceData.filter((event) => {return event.exercise === 'outdoor run' || event.exercise === 'orange theory'}).map((event, index) => {
             return (
                <tr key={index}>
                  <td>8/{event.day}</td>
                  <td>{event.exercise}</td>
                  <td>{event.distance}</td>
                </tr>
              );
            }
          )}
          </tbody>
        </table>
      </div>
    );
  } 
  
}

export default App;
