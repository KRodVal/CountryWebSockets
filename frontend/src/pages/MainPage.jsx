import React, { useState, useEffect, useRef } from "react";

import "./MainPage.css";

function MainPage() {

  const ws = useRef();

  var [countries, setCountries] = useState([]);
  // var countries = [];
  const [country, setCountry] = useState();

  const sendCountry = () => {
    ws.current.send(
      JSON.stringify({ type: 'add', payload: country })
    );
  };

  useEffect(() => {
    const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}`;
    ws.current = new WebSocket(SERVER_URL);

    ws.current.onopen = () => {
      console.log("Conexión de lujo");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'new_country':
          setCountries([...countries, data.payload]);
          // countries.push(data.payload);
          break;
        case 'countries':
          setCountries(data.payload);
          break;
      }
    };

  }, []);

  return (
    <>
      <div id="countriesList">
        <h2>Countries</h2>
        <h3>No se que poner xd</h3>
      </div>
      <div>
        <form className="addCountryForm">
          <input className="field" id="Country" placeholder="Country" onChange={(e) => setCountry(e.target.value)} required></input>
          <button id="addButton" type="button" onClick={sendCountry}>Add new country</button>
        </form>
      </div>
      <div id="countriesList">
        {
          countries.map((c, index) => {
            return (
              <h4 key={index}>
                {c}
              </h4>
            )
          })
        }
        <h4></h4>
      </div>
    </>


  );
}

export default MainPage;