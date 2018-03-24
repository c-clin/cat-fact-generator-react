import React, { Component } from 'react';
import $ from 'jquery';

import './css/style.css';

const catFacts = require('cat-facts');
var factURL = "https://the-cat-fact.herokuapp.com/api/randomfact";

// https://api.unsplash.com/photos/random?&query=cats&client_id=8a3b86c522f37241f107be57b5b3713407e5e3c59942bde90f13a62846da1106
// unsplash cat image
const clientID = "8a3b86c522f37241f107be57b5b3713407e5e3c59942bde90f13a62846da1106"
const query = 'cats'
var imageURL = `https://api.unsplash.com/photos/random?&query=${query}&client_id=${clientID}`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      resultFact: [],
      resultCat: [],
      resultUser: []
    };
    this.getCat = this.getCat.bind(this);
  }

  getCatFact() {
    let randomFact = catFacts.random();
    this.setState({resultFact: randomFact})
    // $.ajax({
    //   url: factURL,
    //   type: 'GET',
    //   // dataType: 'jsonp',
    //   // jsonp: false,
    //   // crossDomain: true,
    //   contentType: 'text/plain',
    //   xhrFields: {
    //     withCredentials: false
    //   },
    //   headers: {
    //             // "Accept" : "application/javscript",
    //             // "Content-Type": "application/javascript",
    //             // "Access-Control-Allow-Origin" : "*",
    //             "Access-Control-Allow-Header" : "header"
    //   },
    //   cashe: false,
    //   success: function(data) {
    //     var fact = data.data.fact;
    //    console.log(fact);
    //     this.setState({resultFact: fact});
    //   }.bind(this),
    //   error: function(error) {
    //    console.log('fail(): ' + error);
    //   }.bind(this)
    // });
  }



  getCat() {
    $.getJSON(imageURL).done(function(data) {
      var resultPhoto = data.urls.regular;
      var user = data.user.name;
      this.setState({resultCat: resultPhoto, resultUser: 'Awesome photo by: ' + user});
    }.bind(this))
    .fail(function(error) {
      console.log('fail(): ' + error);
    })
  }  

  transition() {
    $('.box').css('border','1px solid #000000')
  }

  onClick() {
    this.getCatFact();
    this.getCat();
    this.transition();
  }

  render() {
    return (
      <div className="App">
      <div className="container">
        <h1 className="title">Random Cat Fact Generator</h1>
          <div className="unsplash">
            <button onClick={this.onClick.bind(this)}>get cat!</button>
            <figure className="randomCatPhoto">
              <div className="box">
                <img id="img" src={this.state.resultCat} />
                <p className="fact">{this.state.resultFact}</p>
              </div>
              <figcaption>{this.state.resultUser}</figcaption>
            </figure>
          </div>    
        </div>    
      </div>
    );
  }
}

export default App;
