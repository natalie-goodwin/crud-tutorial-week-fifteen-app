/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

import React from "react";
import './App.css';

const HOUSES_ENDPOINT = 'https://ancient-taiga-31359.herokuapp.com/api/houses';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addNewRoom = this.addNewRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  } /*bind above methods */
  
  render() { /*here we want to iterate through the houses */
    const houses = this.state
    ? this.state.houses.map((house, index) =>
    <House
    key={index}
    data={house}
    addNewRoom={this.addNewRoom}
    deleteRoom={this.deleteRoom} />)
    : null; 
  return (
    <div>
      {houses} 
    </div>
  ); /*we will return a div with all the houses we create above */
  }/*we have to add a room and delete a room */
   /*if the state is not null, we will iterate through all the
  houses on the state using 'map', and create a house element 
  out of them, as above; if the state doesn't have houses, it
  will render as null   */ 

  componentDidMount(){
  fetch(HOUSES_ENDPOINT)
    .then(res => res.json())
    .then(data => {
      this.setState ({
        houses: data
      });
    });
  }

  deleteRoom(e, house, room) {
    const index = house.rooms.indexOf(room);
    house.rooms.splice(index, 1);
    updateHouse(house)
      .then(() => {
        this.setState(state => {
          for (let h of state.houses){ 
            if (h._id === house._id) {
              let h = house;
              break;
            } /*here we call update house and display new data
            once the house is updated to rerender it in the UI */
          }
          return state;
        }); /*we iterate through each hosue in the previous state
        and when we find the house by id that we are updating
        we set 'h' to it and that will be new state object
        which is the updated house, and we will return the 
        house. So the state will have the updated */
      });/*have an index and identify which room we will delete; 
      we remove the element at position index, and just
      remove one */

      e.preventDefault();
  } 

  addRoom(e, house, room) {
    house.rooms.push(room)
    house.rooms.splice(index, 1);
    updateHouse(house)
      .then(() => {
        this.setState(state => {
          for (let h of state.houses){ 
            if (h._id === house._id) {
              let h = house;
              break;
            } /*here we call update house and display new data
            once the house is updated to rerender it in the UI */
          }
          return state;
        }); 
      });/* with addRoom, we want to push this new room to 
      the house*/  
      e.preventDefault();
  } 
} 
 

function updateHouse(house) {
  return fetch(`${HOUSES_ENDPOINT}/${house._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(house)
  }); /*whatever house is passed into this method, we send a 
  "PUT" request and send the hosue back to the server to be 
  updated in the database*/
} /*whether we add or delete a room, we really just 
perform a 'PUT' request, update and change rooms on the house*/