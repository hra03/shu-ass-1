
import React, { useState, useEffect } from "react";

function Events() {
  const [events, setEvents] = useState([]);

  function addImage(someData){
    console.log("got response data")
    let i,j
    var len = Object.keys(someData).length
    var myData = Object.values(someData)

    for (i = 0; i<len; i++){
      var myElement= Object.values(myData)[i]
      var value = Object.values(myElement)
      var key = Object.keys(myElement)

      for (j = 0; j<value.length; j++){
        var myValue = value[j]
        var myKey = key[j]


        if (myKey === "categories"){
          myElement.image = `eventImages/${myValue}.jpg`

        }
      }
    }
  }

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetch("http://localhost:5000/events");
      if (data) {
        const response = await data.json();
        addImage(response)
        setEvents(response);
      } else {
        console.log("No events found.");
      }
    };

    getEvents().catch(console.error);
  }, []);

  return (
    <div className="App">
      <h2>Collection of Events</h2>
      <div className="item-container">
        {events.map((event) => (
          <div className="card" key={event.id}>
            <img src={event.image} alt="" />
            <h3>{event.title}</h3>
            <p>{event.categories}</p>
            <p>{event.time}</p>
            <p>{event.provider}</p>
            <p>{event.duration}</p>
            <p>£{event.price}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;