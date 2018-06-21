import React, { Component } from 'react';
import $ from 'jquery';

import './css/style.css';

const catFacts = require('cat-facts');
// var factURL = 'https://the-cat-fact.herokuapp.com/api/randomfact';

// https://api.unsplash.com/photos/random?&query=cats&client_id=8a3b86c522f37241f107be57b5b3713407e5e3c59942bde90f13a62846da1106
// unsplash cat image
const clientID =
  '8a3b86c522f37241f107be57b5b3713407e5e3c59942bde90f13a62846da1106';
const query = 'cats';
var imageURL = `https://api.unsplash.com/photos/random?&query=${query}&client_id=${clientID}`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      resultFact: [],
      resultCat: [],
      resultUser: [],
      factLoading: false,
      imgLoading: false
    };
    this.getCat = this.getCat.bind(this);
    this.getCatFact = this.getCatFact.bind(this);
    this.insertTwitter = this.insertTwitter.bind(this);
  }

  componentDidMount() {
    this.getCat();
    this.getCatFact();
  }

  getCatFact() {
    let randomFact = catFacts.random();
    this.setState({ resultFact: randomFact });
    this.setState({ factLoading: false });
  }

  getCat() {
    $.getJSON(imageURL)
      .done(
        function(data) {
          var resultPhoto = data.urls.regular;
          var user = data.user.name;
          this.setState({
            resultCat: resultPhoto,
            resultUser: 'Awesome photo by: ' + user
          });
          this.setState({ imgLoading: false });
        }.bind(this)
      )
      .fail(function(error) {
        console.log('fail(): ' + error);
      });
  }

  insertTwitter() {
    $('.twitterLink').html(``);
    $('.twitterText').css('font-family', "'Lobster', cursive");
  }

  onClick = () => {
    this.setState({ factLoading: true, imgLoading: true });
    this.getCatFact();
    this.insertTwitter();
    this.getCat();
  };

  render() {
    let renderContent;
    if (!this.state.imgLoading && !this.state.factLoading) {
      renderContent = (
        <figure className="randomCatPhoto">
          <div className="box">
            <img id="img" src={this.state.resultCat} />
            <p className="fact">{this.state.resultFact}</p>
          </div>
          <figcaption>{this.state.resultUser}</figcaption>
        </figure>
      );
    } else {
      renderContent = <div class="loader">Loading...</div>;
    }

    return (
      <div className="App">
        <div className="container">
          <h1 className="title">Random Cat Fact Generator</h1>
          <div className="unsplash">
            <button onClick={this.onClick}>get cat!</button>
            {renderContent}
          </div>
          <span className="twitterLink">
            <a
              href={
                'https://twitter.com/intent/tweet?text=' +
                this.state.resultFact +
                ' - Random Cat Fact Generator'
              }
              target="_blank"
            >
              <i className="fa fa-twitter-square" aria-hidden="true" />
              <span className="twitterText"> Tweet</span>
            </a>
          </span>
        </div>
      </div>
    );
  }
}

export default App;
