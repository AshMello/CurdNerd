import React, {Component} from 'react';
import {connect} from 'react-redux';

class Journal extends Component {

  constructor() {
    super()

    this.state = {
      photo:'',
      name:'',
      type:'',
      milk:'',
      origin:'',
      texture:'',
      notes:'',
      rating:''
    }
  }
  handleTextChange = (e) => {

    this.setState({
    [e.target.name]: e.target.value})
  }

  handleSaveClick = () => {
    console.log(this.props)
    fetch('http://localhost:8080/api/cheeselist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
      photo: this.state.photo,
    name: this.state.name,
    type: this.state.type,
    milk: this.state.milk,
    origin: this.state.origin,
    texture: this.state.texture,
    notes: this.state.notes,
    rating: this.state.rating,
    user: this.props.user
    })
}).then(response => response.json())
.then(result => {
    if(result) {
      console.log(result)
    } else {
      console.log('error')
    }
  })
  }

  render() {
    return (
      <div>
        <input onChange={this.handleTextChange} name="photo" placeholder="photo"/>
        <input onChange={this.handleTextChange} name="name" placeholder="name"/>
        <input onChange={this.handleTextChange} name="type" placeholder="type (brie, gouda, etc)"/>
        <input onChange={this.handleTextChange} name="milk" placeholder="milk type"/>
        <input onChange={this.handleTextChange} name="origin" placeholder="origin"/>
        <input onChange={this.handleTextChange} name="texture" placeholder="texture"/>
        <input onChange={this.handleTextChange} type="textbox" name="notes" placeholder="notes"/>
        <input onChange={this.handleTextChange} name="rating" placeholder="rating"/>
        <button onClick={this.handleSaveClick}>Save</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.uid
  }
}
  
  export default connect(mapStateToProps)(Journal)