import React, { Component } from 'react';
import './App.css';



var aeonsUtility = {
  settings: {
    players: 4,
    nemesis: null,

  },

  modal: {
    active: false,
    parent: false,
    target: null
  },

  flipIndex: 0,

  nemesis: {
    name: "Nemesis",
    life: 70,
    counters: []
  },

gravehold: {
    name: "Gravehold",
    life: 30,
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
    let name = String.fromCharCode(65 + props.countersTotal)
    props.onClick(name, "nemesis");
  }
  return (
    <button role="button" className={"button add-button count-button"} onClick={handleClick}>Add Counter</button>
  );
}

function Counter(props) {

  function handleClick(e) {
    e.preventDefault();
    props.openModal(props.id, true, "nemesis");
  }

  return (
    <li className="counter counter-sub-entity">
      <h3 className="counter-name counter-sub-entity-name" onClick={handleClick}>{props.name}</h3>
      <CountButton aria-label="add count" isCounter onClick={props.addCount} effectClass="add" {...props}>+</CountButton><p className="counter-count counter-sub-entity-count">{props.life}</p><CountButton isCounter effectClass="minus" onClick={props.minusCount} aria-label="minus count" {...props}>-</CountButton>
    </li>
  );
}

function Entity(props) {

  function handleClick(e) {
    e.preventDefault();
    props.openModal(props.id);
  }

  return (
    <div className="counter counter-entity">
      <h3 className="counter-name counter-entity-name" onClick={handleClick}>{props.name}</h3>
      <CountButton aria-label="add count" onClick={props.addCount} effectClass="add" {...props}>+</CountButton><p className="counter-count counter-entity-count">{props.life}</p><CountButton effectClass="minus" onClick={props.minusCount} aria-label="minus count" {...props}>-</CountButton>
    </div>
  );
}


function CountButton(props) {
  function handleClick(e) {
    e.preventDefault();
    props.onClick(props.id, props.isCounter);
  }
  return (
    <button role="button" className={"button button-count button-count-" + props.effectClass} onClick={handleClick}>
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
    <button className="button button-settings" type="submit" onClick={handleClick}>{props.text}</button>
  );
}

function Debug(props) {
  function handleClick(e) {
    e.preventDefault();
    props.onClick();
  }
  return (
    <button className="button" role="button" onClick={handleClick}>Debug</button>
  );
}

class Modal extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.data);
    this.state = {
      data: this.props.data
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log(this.props.target + " - " + this.state.data.name + " - " + this.state.data.color + " - " + this.props.parent);
    this.props.saveData(this.props.target, this.state.data.name, this.state.data.color, this.props.parent);
  }

  handleNameChange = (event) => {
    this.setState({data: { [event.target.name]: event.target.value }});
  };

  handleColorChange = (event) => {
    this.setState({data: { [event.target.name]: event.target.value }});
  };

  handleValueChange = (event) => {
    let newData = this.state.data;
    newData[event.target.name] = event.target.value
    this.setState({data: newData});
  };

  debug = () => {console.log(this.state)};

  render() {

    return (
      <div className={"modal modal--" + this.props.active}>
        <input className="modal-input"
          type="text"
          name="name"
          value={this.state.data.name ? this.state.data.name : ''}
          onChange={this.handleValueChange}
        />
        <input className="modal-input"
          type="text"
          name="color"
          value={this.state.data.color ? this.state.data.color : ''}
          onChange={this.handleValueChange}
        />
        { this.props.parent &&
          <div>
            <input onChange={this.handleValueChange} type="radio" name="counterType" value="power" /><label htmlFor="power"> Power</label>
            <input onChange={this.handleValueChange} type="radio" name="counterType" value="minion" /><label htmlFor="minion"> Minion</label>
          </div>
        }
         <button onClick={this.handleClick} className="modal-button button button-save" type="submit">Save</button>
         <Debug onClick={this.debug} />
      </div>
    );
  }
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
        <button className="button button-shuffle" type="submit" onClick={this.props.shuffle}>Shuffle</button>
      </div>
    );
  }

}

class App extends Component {
  constructor(props) {
    super (props);
    this.state = aeonsUtility;
    console.log(this.state);
    //console.log();
  }

  componentDidMount() {
    this.shuffle(this.state.turnDeck);
  }

  debug = () => {console.log(this.state)};

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

nemesisPower = () => {
  let newState = this.state;
  for (let i = 0; i < newState.nemesis.counters.length; i++) {
    if (newState.nemesis.counters[i].counterType === "power") {
      newState.nemesis.counters[i].life--;
      if (newState.nemesis.counters[i].life <= 0) {
        alert("Resolve Power");
      }
    }
  }
}

nemesisPersistant = () => {}

addCounter = (counterName, type) => {
  let newState = this.state;
  newState.nemesis.counters.push({
    id: newState.nemesis.counters.length,
    name: counterName,
    count: 0,
    life: 0,
    counterType: type
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

  openModal = (entityID, isCounter, parentID) => {
    //targetLocation =
    var newInput = {
      target: entityID,
      parent: parentID,
      active: true
    }
    this.setState({modal: newInput})
  }

  closeModal = (playerID) => {
    var newInput = {
      target: null,
      parent: false,
      active: false
    }
    this.setState({modal: newInput})
  }

  saveData = (entityID, name, color, parentID) => {
    console.log(entityID + " - " + name + " - " + color + " - " + parentID)
    var newInput = {
      target: entityID,
      parent: parentID,
      active: false
    }
    let newState = this.state;
    newState.modal = newInput;
    if (!parentID) {
      newState[entityID].name = name;
      newState[entityID].color = color;
    } else {
      newState[parentID].counters[entityID].name = name;
      newState[parentID].counters[entityID].color = color;
    }

    this.setState({newState});
  }

  render() {
    return (

      <div className="App">
        <div className="settings">
          <span className="settings-label">Players: </span>
          <Setting onClick={this.changePlayerCount} value={1} text="1" />
          <Setting onClick={this.changePlayerCount} value={2} text="2" />
          <Setting onClick={this.changePlayerCount} value={3} text="3" />
          <Setting onClick={this.changePlayerCount} value={4} text="4" />
        </div>
        <Deck settings={this.state.settings} shuffle={this.shuffle} flipCard={this.flipCard} flipIndex={this.state.flipIndex} deckName="turnDeck" deckObj={this.state.turnDeck} classes="turnDeck" cardClasses={"turnDeck turnDeck-card"}  />
        <div className="entities">
          <Entity name={this.state.nemesis.name} openModal={this.openModal} id="nemesis" life={this.state.nemesis.life} addCount={this.addLife} minusCount={this.minusLife} />
          <Entity name={this.state.gravehold.name} openModal={this.openModal} id="gravehold" life={this.state.gravehold.life} addCount={this.addLife} minusCount={this.minusLife} />
        </div>
        <AddCounterButton countersTotal={this.state.nemesis.counters.length} onClick={this.addCounter} />
        <ul className="counters">
          {this.state.nemesis.counters.map((counter, i) =>
            <Counter name={counter.name} openModal={this.openModal} id={counter.id} life={counter.life} addCount={this.addLife} minusCount={this.minusLife} key={i} />
          )}
        </ul>
        { this.state.modal.active &&
          <Modal saveData={this.saveData} active={this.state.modal.active} target={this.state.modal.target} parent={this.state.modal.parent} data={this.state.modal.parent ? this.state[this.state.modal.parent].counters[this.state.modal.target] : this.state[this.state.modal.target]} />
        }
        <Debug onClick={this.debug} />
      </div>
    );
  }
}

export default App;
