import React, {Component} from 'react';
import {connect} from 'react-redux';

class ViewAll extends Component {
    constructor() {
    super()

    this.state = {
        cheeseList: []
    }
    }

    componentDidMount() {
        let url = 'http://localhost:8080/api/cheeselist'
        fetch(url)
        .then(response => response.json())
        .then(json => {
          let cheeseList = json.map((cheese) => {
            if(cheese.user === this.props.user) {
              return (
                <div key = {cheese.id}>
                <ul>
                  <img src={cheese.photo}></img>
                  <br></br>

                  <li>Name:{cheese.name} , Type:{cheese.type}</li>
                  <br></br>
                  <li>Milk:{cheese.milk} , Origin:{cheese.origin}</li>
                  <li>Texture:{cheese.texture}</li>
                  <br></br>
                  <li>Notes:{cheese.notes}</li>
                  <br></br>
                  <li>Stars:{cheese.rating}</li>
                  <button onClick={() => this.deleteCheese(cheese)}>Delete</button>
                  <button>Update</button>
                </ul>
                </div>
              )
            }
          })
          this.setState({cheeseList: cheeseList})
        })
      }

      render() {
        return (
          <div>
            {this.state.cheeseList}
          </div>
        )
      }

      deleteCheese(cheese) {

        let delId = {
            entryKey: cheese.id
        }
        console.log(delId)
        fetch("http://localhost:8080/delete", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(delId)
        }).then(response => {
            if (response.status >= 400) {
                throw new Error("Error")
            }
            return response.json()
            
        }).then(delId => {
            if(delId === "success"){
                console.log("success")
            }
    })
}
    
}

const mapStateToProps = (state) => {
    return {
      user: state.uid
    }
  }

export default connect(mapStateToProps)(ViewAll)