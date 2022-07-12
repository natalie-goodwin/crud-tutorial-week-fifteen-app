import React from "react";


export default class NewRoomForm extends React.Component {
    constructor(props) {
        super(props);
        this.state= { 
            nameValue: "",
            areaValue: ""
        } /*these will be the values on 
        the new room; there will be an input
        film mapped to our name and area values
        in the new room form state */
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAreaChange = this.handleAreaChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

    }

        handleNameChange(e) {
            this.setState({nameValue: e.target.value})
        } /*whatever the target was of the event,
        and its value, we set the name value to that */ 
        handleAreaChange(e) {
            this.setState({areaValue: e.target.value});
        }
        handleClick(e) {
            this.props.addNewRoom(e, this.props.data,
            {name: this.state.nameValue, area: this.state.areaValue});
            this.setState({nameValue: "", areaValue: ""});
        } /*calling addNewRoom method passed in on props, and 
        pass in the event itself, the data of this specific house,
        and pass in the new room; the new room name will be below; reset name and area 
        values to empty values; setting it back for good
        user experience */
        render(){
            return (
                <div>
                    <input type="text" placeholder="Name" onChange={this.handleNameChange} value={this.state.nameValue}></input>
                    <input type="text" placeholder="Area" onChange={this.handleAreaChange} value={this.state.areaValue}></input>
                    <button onClick={this.handleClick}>Add Room</button>
                </div> /*on click, will handle the event and it will have
                the data based on that event */
            ) /*anytime the name changes, it will update the name value that the
            handleNameChange method tells it to do */ 
        }
    }
    
