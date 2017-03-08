import React, { Component } from 'react';
import './App.css';

var aeonsUtility = {
  settings: {
    players: 4,
    nemesis: null,

  },

  counters: [],

  flipIndex: 0,

  nemesis: {
    name: "",
    life: 70,
    counters: []
  },

  turnDeck: [
      {
        id: "A",
        names: [
          "Player", "Player One", "Player One", "Player One"
        ],
        letters: [
          "P", "P1", "P1", "P1"
        ],
        faceUp: false,
        player: true
      },
      {
        id: "B",
        names: [
          "Player", "Player Two", "Player Two", "Player Two"
        ],
        letters: [
          "P", "P2", "P2", "P2"
        ],
        faceUp: false,
        player: true
      },
      {
        id: "C",
        names: [
          "Player", "Player One", "Player Three", "Player Three"
        ],
        letters: [
          "P", "P1", "P3", "P3"
        ],
        faceUp: false,
        player: true
      },
      {
        id: "D",
        names: [
          "Player", "Player Two", "Wild Player", "Player Four"
        ],
        letters: [
          "P", "P2", "WP", "P4"
        ],
        faceUp: false,
        player: true
      },
      {
        id: "E",
        names: [
          "Nemesis", "Nemesis", "Nemesis", "Nemesis"
        ],
        letters: [
          "N", "N", "N", "N"
        ],
        faceUp: false,
        player: false
      },
      {
        id: "F",
        names: [
          "Nemesis", "Nemesis", "Nemesis", "Nemesis"
        ],
        letters: [
          "N", "N", "N", "N"
        ],
        faceUp: false,
        player: false
      },
    ],

};

function AddCounterButton(props) {
  function handleClick(e) {
    e.preventDefault();
    props.onClick("A", "power");
  }
  return (
    <button role="button" className={"button add-button count-button"} onClick={handleClick}>Add Counter</button>
  );
}

function Counter(props) {

  function handleClick(e) {
    e.preventDefault();
    props.openModal(props.id, true, props.playerID);
  }

  return (
    <li className="counter">
      <h3 className="counter-name" onClick={handleClick}>{props.name}</h3>
      <CountButton aria-label="add count" onClick={props.addCount} effectClass="add" {...props}>+</CountButton><p className="counter-count">{props.life}</p><CountButton effectClass="minus" onClick={props.minusCount} aria-label="minus count" {...props}>-</CountButton>
    </li>
  );
}


function CountButton(props) {
  function handleClick(e) {
    e.preventDefault();
    props.onClick(props.id, true);
  }
  return (
    <button role="button" className={"button count-button count-button-" + props.effectClass} onClick={handleClick}>
      {props.children}
    </button>
  );
}


function Card(props) {
  function handleClick(e) {
    e.preventDefault();
    props.flipCard(props.id, props.deckName, props.flipIndex);
  }
  return (
    <div className={"card " + props.classes} onClick={handleClick}>
      <div className="card-inner">
        <span className="card-letter">{props.letter}</span>
        <h3 className="card-name">{props.name}</h3>
        <span className="card-letter">{props.letter}</span>
      </div>
    </div>
  );
}

function Setting(props) {
  function handleClick(e) {
    e.preventDefault();
    props.onClick(props.value);
  }
  return (
    <button type="submit" onClick={handleClick}>{props.text}</button>
  );
}

class Deck extends Component {

  componentWillMount() {
    this.props.shuffle(this.props.deckName);
  }

  render () {
    return (
      <div className={"deck " + this.props.classes}>
        {this.props.deckObj.map((card, i) => {
            let n = card.names[this.props.settings.players - 1];
            let l = card.letters[this.props.settings.players - 1];
            return (
                <Card name={n} classes={"card" + (card.faceUp ? "--faceup " : "--facedown ") + this.props.cardClasses} deckName={this.props.deckName} flipIndex={this.props.flipIndex} flipCard={this.props.flipCard} letter={l} key={card.id} id={card.id} order={i} />
            );

          }
        )}
        <button className="shuffle-button" type="submit" onClick={this.props.shuffle}>Shuffle</button>
      </div>
    );
  }

}

class App extends Component {
  constructor(props) {
    super (props);
    this.state = aeonsUtility;
    console.log(this.state);

  }

  componentDidMount() {
    this.shuffle(this.state.turnDeck);
  }

  flipCard = (cardID, deckName, order) => {
    if (!this.state.flipping) {
      this.setState({flipping: true});
      let newState = this.state;

      if (newState.flipIndex < newState[deckName].length) {
        newState[deckName][order].faceUp = !newState[deckName][order].faceUp;
        newState.flipIndex++;
      }

      this.setState({newState});
      setTimeout(()=> {this.setState({flipping: false})},1000);
      if (newState[deckName][order] && !newState[deckName][order].player) {
        this.nemesisTurn();
      }
    }
  }

  nemesisTurn = () => {
    this.nemesisPower();
    this.nemesisPersistant();

  }

nemesisPower = () => {}

nemesisPersistant = () => {}

addCounter = (counterName, type) => {
  let newState = this.state;
  newState.nemesis.counters.push({
    id: newState.nemesis.counters.length,
    name: counterName,
    count: 0,
    life: 0,
    type: type
  });
  this.setState(newState);
}

addLife = (entity, isCounter) => {
  let newState = this.state;
  if (isCounter) {
    newState.nemesis.counters[entity].life++;
  } else if (!isCounter) {

    newState[entity].life++;
  }
  this.setState({newState});
}

minusLife = (entity, isCounter) => {
  let newState = this.state;
  if (isCounter) {
    newState.nemesis.counters[entity].life--;
  } else if (!isCounter) {

    newState[entity].life--;
  }
  this.setState({newState});
}

  changePlayerCount = (playerCount) => {
    let newSettings = this.state.settings;
    newSettings.players = playerCount;
    this.setState({settings: newSettings});
  }

  shuffle = (deckName) => {
    if (!this.state.shuffling) {
      this.setState({shuffling: true});
      let newState = this.state;
      let array = newState.turnDeck;

      let m = array.length, t, i;

      while (m) {

        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;

      }

      let a = 0;
      let b = 0;
      let temp = null;

      for ( a = array.length - 1; a >= 0; a -= 1) {
         b = Math.floor(Math.random() * (a + 1))
        temp = array[a];
        array[a] = array[b];
        array[b] = temp;
      }

      for (let j = array.length - 1; j >= 0; j-- ) {
        array[j].faceUp = false;
        newState.flipIndex = 0;
      }

      newState[deckName] = array;
      this.setState(newState);
      setTimeout(()=> {this.setState({shuffling: false})},1000);
    }

  }

  render() {
    return (
      <div className="App">
        <Setting onClick={this.changePlayerCount} value={1} text="One Player" />
        <Setting onClick={this.changePlayerCount} value={2} text="Two Player" />
        <Setting onClick={this.changePlayerCount} value={3} text="Three Player" />
        <Setting onClick={this.changePlayerCount} value={4} text="Four Player" />
        <Deck settings={this.state.settings} shuffle={this.shuffle} flipCard={this.flipCard} flipIndex={this.state.flipIndex} deckName="turnDeck" deckObj={this.state.turnDeck} classes="turnDeck" cardClasses={"turnDeck turnDeck-card"}  />
        <AddCounterButton onClick={this.addCounter} />
        <ul className="counters">
          {this.state.nemesis.counters.map((counter, i) =>
            <Counter name={counter.name} openModal={this.openModal} id={counter.id} life={counter.life} addCount={this.addLife} minusCount={this.minusLife} key={i} />
          )}
        </ul>
      </div>
    );
  }
}

export default App;
