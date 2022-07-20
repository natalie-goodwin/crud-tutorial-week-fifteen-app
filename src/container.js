import React from "react";
import './App.css';
import House from "./house";

const HOUSES_ENDPOINT = "https://ancient-taiga-31359.herokuapp.com/api/houses";
// endpoint for all classes
export default class Container extends React.Component {
  constructor(props) { /*pass to super props */
    super(props);
    this.addNewRoom = this.addNewRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  } /*bind above methods; methods will be called 
  for adding and deleting rooms */
  
  render() { /*here we want to iterate through the houses with if/else */
    const houses = this.state /*variable for iterating through state of houses */
    ? this.state.houses.map((house, index) => /*pass in hosue and index arguments */
    <House /*we are returning a house */
    key={index} /*unique id for each house */
    data={house} /*the house for this data */
    addNewRoom={this.addNewRoom} /*method passed down from props*/
    deleteRoom={this.deleteRoom} />) /*method passed down from props */
    : null; /*if the state is not null we iterate through the houses and create a house element; 
    if it's null, we won't render anything */ 
  return (
    <div>
      {houses} 
    </div> /*array of houses being iterated */
  ); /*we will return a div with all the houses we create above */
}/*we have to add a room and delete a room */
   /*if the state is not null, we will iterate through all the
  houses on the state using 'map', and create a house element 
  out of them, as above; if the state doesn't have houses, it
  will render as null   */ 

  componentDidMount(){ /* here make asynchronous calls*/
  fetch(HOUSES_ENDPOINT)
    .then(res => res.json())
    .then(data => { /*when data comes back we call setState */
      this.setState ({
        houses: data /*data we get back becomes the house in our state -- grabs houses */
      }); /*the data we get back from the http request,
      we make that a house in our state */
    });
  }

  deleteRoom(e, house, room) { /* e is the default action when the browser handles an event */
    const index = house.rooms.indexOf(room); /*index identifies which house we will delete */
    house.rooms.splice(index, 1); /*we are splicing out room at index, and only splicing one of them */
    updateHouse(house) /*taking array we have in memory and removing a room */
      .then(() => { /* here we send HTTP request to make this permanent in the database that our API is wrapping around*/
        this.setState(state => { /*passing in house through the updateHouse method */
          for (let h of state.houses){ /* iterate over houses in previouse state*/
            if (h._id === house._id) {
              let h = house;
              break; /*iterate through houses in 
              previous state and when we find 
              house id we want to update we set 'h' 
              to it and this will be new state 
              object(updated house) and return new 
              state with updated house */
            } /*here we call update house and display new data
            once the house is updated to rerender it in the UI */
          }
          return state;
        }); /*we iterate through each hosue in the previous state
        and when we find the house by id that we are updating
        we set 'h' to it and that will be new state object
        which is the updated house, and we will return the 
        house. So the new state will have the updated house*/
      });/*have an index and identify which room we will delete; 
      we remove the element at position index, and just
      remove one */

      e.preventDefault();
  } 

  addNewRoom(e, house, room) { /*here we push a new room to the house */
    house.rooms.push(room)
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
      e.preventDefault();/*this is the default 
      action that any event the browser 
      fires off is going to take */
  } 
} 
 

function updateHouse(house) { /*using updateHouse from above in this function */
  return fetch(`${HOUSES_ENDPOINT}/${house._id}`, {
    method: 'PUT', /*update house and change rooms */
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(house)
  }); /*whatever house is passed into this method, we send a 
  "PUT" request and send the house back to the server to be 
  updated in the database*/
} /*whether we add or delete a room, we really just 
perform a 'PUT' request, update and change rooms on the house*/
