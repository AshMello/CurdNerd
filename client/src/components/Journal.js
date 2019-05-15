import React, {Component} from 'react';
import {connect} from 'react-redux';
import StarRatingComponent from 'react-star-rating-component';
import {Form, Col, Button} from 'react-bootstrap';

import Dropzone from 'react-dropzone';
import request from 'superagent';
import './Journal.css';
const CLOUDINARY_UPLOAD_PRESET = 'vigb9ffx'
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/curdnerd/image/upload'

class Journal extends Component {

  constructor() {
    super()

    this.state = {
      fileUrl: null,
      name:'',
      type:'',
      milk:'',
      origin:'',
      texture:'',
      notes:'',
      rating:1
    }
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  handleTextChange = (e) => {
    this.setState({
    [e.target.name]: e.target.value})
  }

  onImageDrop(files){
    this.setState({
      uploadedFile: files[0]
    })
    this.handleImageUpload(files[0])
  }

  handleImageUpload(file){
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file)
    
    upload.end((err, response) => {
      if(err){
        console.error(err)
      }
      if(response.body){
        this.setState({
          fileUrl: response.body.secure_url
        })
      }
    })
  }

  handleSaveClick = () => {
    fetch('http://localhost:8080/api/cheeseList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({
    photoUrl: this.state.fileUrl,
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

    const { rating } = this.state;

    return (
      <div className="container">
          <div>
            <Dropzone
              onDrop={this.onImageDrop.bind(this)}
              accept="image/*"
              multiple={false}>
                {({getRootProps, getInputProps}) => {
                  return (
                    <div
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      {
                      <p>Try dropping some files here, or click to select files to upload.</p>
                      }
                    </div>
                  )
                }}
            </Dropzone>
          </div>




        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Cheese Name</Form.Label>
              <Form.Control onChange={this.handleTextChange} name="name" placeholder="name" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Cheese Type</Form.Label>
              <Form.Control onChange={this.handleTextChange} name="type" placeholder="type (brie, gouda, etc)" />
            </Form.Group>
          </Form.Row>

          <Form.Row>
          <Form.Group as={Col} controlId="formGridAddress1">
            <Form.Label>Milk Type</Form.Label>
            <Form.Control onChange={this.handleTextChange} name="milk" placeholder="milk type" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridAddress2">
            <Form.Label>Origin</Form.Label>
            <Form.Control onChange={this.handleTextChange} name="origin" placeholder="origin" />
          </Form.Group>

          
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Texture</Form.Label>
              <Form.Control onChange={this.handleTextChange} name="texture" placeholder="texture"/>
            </Form.Group>
            </Form.Row>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="3" onChange={this.handleTextChange} name="notes" placeholder="notes"/>
            </Form.Group>
        </Form>
        {/* <input onChange={this.handleTextChange} name="name" placeholder="name"/>
        <input onChange={this.handleTextChange} name="type" placeholder="type (brie, gouda, etc)"/>
        <input onChange={this.handleTextChange} name="milk" placeholder="milk type"/>
        <input onChange={this.handleTextChange} name="origin" placeholder="origin"/>
        <input onChange={this.handleTextChange} name="texture" placeholder="texture"/>
        <input onChange={this.handleTextChange} type="textbox" name="notes" placeholder="notes"/> */}
        <StarRatingComponent 
          name="rating" 
          starCount={5}
          value={rating}
          starColor="orange"
          emptyStarColor="grey"
          onStarClick={this.onStarClick.bind(this)}/>
          <br></br>
          <Button variant="primary" onClick={this.handleSaveClick}>Save </Button>
        {/* <button onClick={this.handleSaveClick}>Save</button> */}

        {/* {ViewAll} */}
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