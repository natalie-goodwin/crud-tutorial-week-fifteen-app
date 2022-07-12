import React from "react";
import NewRoomForm from "./new-room-form";

export default class House extends React.Component {
 render() { 
    const rooms = this.props.data.rooms
    ? this.props.data.rooms.map((room, index) => 
        <li key={index}>
            {room.name} Area {room.area}
            <button onClick={e =>
            this.props.deleteRoom(e, this.props.data, room)
        }>Delete</button> 
        </li>) 
    : null; /*we allow for null in case there
    are no rooms */
    return (
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
        form will also have access to the data */ 
    );
 }/*the li is the room, and 
    the button will delete the rooms */
} /* house will use new room form we will create later
but it isn't created yet; if there are rooms
we will pass each room and create a list */