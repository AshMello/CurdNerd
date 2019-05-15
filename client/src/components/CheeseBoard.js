import React, {Component} from 'react';
import {connect} from 'react-redux';
import './CheeseBoard.css';

class CheeseBoard extends Component {
    constructor() {
        super()
          this.state = {
              itemList: []
          }
        }
    allowDrop = (e) => {
        e.preventDefault();
      }
      
    drag = (e) => {
        e.dataTransfer.setData("text", e.target.id);
      }
      
    drop = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));
      }


handleCheeseClick = () => {
    let url = 'http://localhost:8080/api/itemlist'
    fetch(url)
    .then(response => response.json())
    .then(json => {
        let itemList = json.map((item) => {
        if(item.type === "Cheese") {
            return (
            <div key = {item.id}>
            <ul>
                <img className="cheeseImg" src={item.image} onDragStart={(e) => this.drag(e)} id={item.id}></img>
                <br></br>

                <li>Name:{item.name}</li>
                <br></br>
                <li>Pairs With:{item.pairing}</li>
            </ul>
            </div>
            )
        }
        })
        this.setState({itemList: itemList})
    })
    }


    render() {
        return (
            <div>
                {/* <img draggable="true" onDragStart={(e) => this.drag(e)} id="drag1" width="88" height="31"></img> */}
                <div id="cheeseDrag">
                <br></br>
                <div id="div1" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}>
                </div>
                <div id="div2" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}>
                </div>
                <div id="div3" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)}>
                </div>
                </div>
                <button onClick={this.handleCheeseClick}>Cheese</button>
                <div id="itemDisplay">
              
                    {this.state.itemList}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      user: state.uid
    }
  }

export default connect(mapStateToProps)(CheeseBoard)