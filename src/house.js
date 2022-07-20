import React from "react";
import NewRoomForm from "./new-room-form";

export default class House extends React.Component {
 render() { /*house will use new room form which is imported above */
    const rooms = this.props.data.rooms /*if there are rooms this will be the array */
    ? this.props.data.rooms.map((room, index) => /*rooms will be added if they exist */ 
        <li key={index}>
            {room.name} Area {room.area} 
            <button onClick={e =>
            this.props.deleteRoom(e, this.props.data, room)
        }>Delete</button> 
        </li>) 
    : null; /* we create a list element for each room above with a button
    that allows a delete event; we pass in deleteRoom prop from container into 
    each room; the props allows for passing methods; 
    we allow for null in case there are no rooms*/
    return (/*the data below is the house itself; 
    name is the name of the specific house; 
    we are returning array of rooms; we are also 
    returning the newRoom form  */
        <div> 
            <h1>{this.props.data.name}</h1>
            <ul>
                {rooms} 
            </ul>
            <NewRoomForm
            addNewRoom={this.props.addNewRoom} data={this.props.data} />
        </div>/*we're going to pass the component
        that came from the parent component in
        app.js into this component in the NewRoomForm; the
        form will also have access to the data to know which data to add to request  */ 
    );
 }/*the li is the room, and 
    the button will delete the rooms */
} /* house will use new room form we will create later
but it isn't created yet; if there are rooms
we will pass each room and create a list */