import React, { Component } from 'react';
import './App.css';



var aeonsUtility = {
  settings: {
    players: 4,
    nemesis: null,
    open: false,
  },

  modal: {
    active: false,
    parent: false,
    target: null
  },

  activeView: "player",

  views: {
    utility: UtilityView,
    player: PlayerView
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

  player: {
      name: "Player",
      life: 10,
      totalCharges: 5,
      currentCharges: 0,
      counters: []
    },

  turnDeck: [
      {
        id: "A",
        names: [
          "Player", "Player One", "Player One", "Player One", "One or Two"
        ],
        letters: [
          "P", "1", "1", "1", "1/2"
        ],
        faceUp: false,
        player: true,
        flipping: false
      },
      {
        id: "B",
        names: [
          "Player", "Player Two", "Player Two", "Player Two", "One or Two"
        ],
        letters: [
          "P", "2", "2", "2", "1/2"
        ],
        faceUp: false,
        player: true,
        flipping: false
      },
      {
        id: "C",
        names: [
          "Player", "Player One", "Player Three", "Player Three", "Three or Four"
        ],
        letters: [
          "P", "1", "3", "3", "3/4"
        ],
        faceUp: false,
        player: true,
        flipping: false
      },
      {
        id: "D",
        names: [
          "Player", "Player Two", "Wild Player", "Player Four", "Three or Four"
        ],
        letters: [
          "P", "2", "W", "4", "3/4"
        ],
        faceUp: false,
        player: true,
        flipping: false
      },
      {
        id: "E",
        names: [
          "Nemesis", "Nemesis", "Nemesis", "Nemesis", "Nemesis"
        ],
        letters: [
          "N", "N", "N", "N", "N"
        ],
        faceUp: false,
        player: false,
        flipping: false
      },
      {
        id: "F",
        names: [
          "Nemesis", "Nemesis", "Nemesis", "Nemesis", "Nemesis"
        ],
        letters: [
          "N", "N", "N", "N", "N"
        ],
        faceUp: false,
        player: false,
        flipping: false
      },
    ],

    deckHint: true,
    flipping: false

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
    props.openModal(props.position, true, "nemesis");
  }

  return (
    <li className="counter counter-sub-entity">
      <h3 className="counter-name counter-sub-entity-name" onClick={handleClick}>{props.name}</h3><CountButton isCounter onClick={props.remove} effectClass="remove" {...props}>X</CountButton>
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
    props.position ? props.onClick(props.position, props.isCounter) : props.onClick(props.id, props.isCounter);
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
    props.flipCard(props.deckName, props.flipIndex);
  }
  return (
    <div className={"card " + props.classes} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front">
          <span className="card-letter">{props.letter}</span>
          <h3 className="card-name">{props.name}</h3>
          <span className="card-letter">{props.letter}</span>
        </div>
        <div className="card-back">
        </div>
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
    <button className={"button button-settings button-settings--" + (props.data.players === props.value)} type="submit" onClick={handleClick}>{props.text}</button>
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

function ToggleMenu(props) {
  function handleClick(e) {
    e.preventDefault();
    props.onClick();
  }
  return (
    <button className="button" role="button" onClick={handleClick}>{props.text ? props.text : "Settings"}</button>
  );
}

function Menu(props) {
    function handleChangeView(e) {
      props.changeView();
    }
    return (
      <div className={"menu  menu--" + props.data.open}>
        <h2 className="menu-title">{props.title}</h2>
        <section className="menu-section">
          <label className="menu-section-label">Players</label>
          <Setting onClick={props.changePlayerCount} data={props.data} value={1} text="1" />
          <Setting onClick={props.changePlayerCount} data={props.data} value={2} text="2" />
          <Setting onClick={props.changePlayerCount} data={props.data} value={3} text="3" />
          <Setting onClick={props.changePlayerCount} data={props.data} value={4} text="4" />
          <Setting onClick={props.changePlayerCount} data={props.data} value={5} text="4V" />
        </section>
        <section className="menu-section">
          <label className="menu-section-label">Color Scheme</label>
          <label className="menu-section-toggle">
            <input className="menu-section-toggle-function" type="checkbox" />
            <div className="menu-section-toggle-display"></div>
          </label>
        </section>
        <section className="menu-section">
          <label className="menu-section-label">Player View</label>
          <label className="menu-section-toggle">
            <input onChange={handleChangeView} className="menu-section-toggle-function" type="checkbox" />
            <div className="menu-section-toggle-display"></div>
          </label>
        </section>
        <ToggleMenu text="Close" onClick={props.toggleMenu} />
      </div>
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

  constructor(props) {
    super (props);
    console.log(this.props)
  }

  componentWillMount() {
    this.props.shuffle(this.props.deckName);
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.flipCard(this.props.deckName, this.props.flipIndex);
  }

  render () {
    return (
      <div className={"deck " + this.props.classes + " deck--" + this.props.deckHint} onClick={this.handleClick}>
        {this.props.deckObj.map((card, i) => {
            let n = card.names[this.props.settings.players - 1];
            let l = card.letters[this.props.settings.players - 1];
            return (
                <Card name={n} classes={"card" + (card.faceUp ? "--faceup " : "--facedown ") + " card" + (card.flipping ? "--active " : "--inactive ") + (i === this.props.flipIndex  ? "card--next " : "") + this.props.cardClasses} deckName={this.props.deckName} flipIndex={this.props.flipIndex} flipCard={this.props.flipCard} letter={l} key={card.id} id={card.id} order={i} />
            );

          }
        )}
        <button className="button button-shuffle" type="submit" onClick={this.props.shuffle}>Shuffle</button>
      </div>
    );
  }

}

function UtilityView(props) {
  return (
    <div className="view-inner">
      <Deck settings={props.appState.settings} deckHint={props.appState.deckHint} shuffle={props.shuffle} flipCard={props.flipCard} flipIndex={props.appState.flipIndex} deckName="turnDeck" deckObj={props.appState.turnDeck} classes="turnDeck" cardClasses={"turnDeck turnDeck-card"}  />
      <div className="entities">
        <Entity name={props.appState.nemesis.name} openModal={props.openModal} id="nemesis" life={props.appState.nemesis.life} addCount={props.addLife} minusCount={props.minusLife} />
        <Entity name={props.appState.gravehold.name} openModal={props.openModal} id="gravehold" life={props.appState.gravehold.life} addCount={props.addLife} minusCount={props.minusLife} />
      </div>
      <div className="controls">
        <Debug onClick={props.debug} />
        <ToggleMenu onClick={props.toggleMenu} />
        <AddCounterButton countersTotal={props.appState.nemesis.counters.length} onClick={props.addCounter} />
      </div>
      <ul className="counters">
        {props.appState.nemesis.counters.map((counter, i) =>
          <Counter name={counter.name} openModal={props.openModal} id={counter.id} life={counter.life} addCount={props.addLife} minusCount={props.minusLife} remove={props.removeCounter} position={i} key={i} />
        )}
      </ul>
      { props.appState.modal.active &&
        <Modal saveData={props.saveData} active={props.appState.modal.active} target={props.appState.modal.target} parent={props.appState.modal.parent} data={props.appState.modal.parent ? props.appState[props.appState.modal.parent].counters[props.appState.modal.target] : props.appState[props.appState.modal.target]} />
      }
    </div>
  );
}

function PlayerView(props) {
  function renderCharges()  {
    let charges = [];
    for (let i = 0; i <= props.appState.player.totalCharges; i++ ) {
      let classes = "charge "
      if (props.appState.player.currentCharges > i ) {
        classes +=  "charge--active";
      }
      charges.push(<li className={classes} key={i}></li>);

    }
    return charges;
  }
  function handleAddCharge(e) {
    props.addCharge();
  }
  return (
    <div className="view-inner">
    <h1>{props.appState.player.name}</h1>
    <h2>{props.appState.player.life}</h2>
    <ul className="charges" onClick={handleAddCharge}>{renderCharges()}</ul>
    <div className="controls">
      <ToggleMenu onClick={props.toggleMenu} />
    </div>
    </div>
  );
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

  debug = () => {console.log(this.state)};

  toggleMenu = () => {
    let newState= this.state;
    newState.settings.open = !newState.settings.open;
    this.setState({newState})
  };

  flipCard = (deckName, order) => {
    if (deckName) {
      if (!this.state.flipping) {
        let newState = this.state;
        newState.deckHint = false;
        if (newState.flipIndex < newState[deckName].length && newState[deckName][order]) {
          newState[deckName][order].faceUp = !newState[deckName][order].faceUp;
          newState.flipIndex++;
        }
        newState.flipping = true;
        this.setState(newState);


        setTimeout(()=> {this.setState({flipping: false})},1000);
        if (newState[deckName][order] && !newState[deckName][order].player) {
          this.nemesisTurn();
        }
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

removeCounter = (entity) => {
  let newState = this.state;
  newState.nemesis.counters.splice(entity, 1);
  this.setState({newState});
}


  changePlayerCount = (playerCount) => {
    let newSettings = this.state.settings;
    newSettings.players = playerCount;
    this.setState({settings: newSettings});
  }

  changeView = (event) => {
    let newView = this.state.activeView;
    switch (newView) {
      case "utility":
        newView = "player";
        break;
      case "player":
        newView = "utility";
        break;
      default:
        newView = "utility";
        break;
    }

    this.setState({activeView: newView});
  }

  addCharge = () => {
    let newState = this.state;
    newState.player.currentCharges++;
    this.setState({newState});
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
        <div className={"view view-"+this.state.activeView}>

        {
          this.state.activeView === "utility" &&
            <UtilityView openModal={this.openModal} debug={this.debug} saveData={this.saveData} toggleMenu={this.toggleMenu} shuffle={this.shuffle} flipCard={this.flipCard} addLife={this.addLife} minusLife={this.minusLife} addCounter={this.addCounter} removeCounter={this.removeCounter} appState={this.state}  {...this.props} />
        }

        {
          this.state.activeView === "player" &&
            <PlayerView appState={this.state} addCharge={this.addCharge} toggleMenu={this.toggleMenu} />
        }


        </div>
        <Menu changePlayerCount={this.changePlayerCount} changeView={this.changeView} title="Settings" data={this.state.settings} toggleMenu={this.toggleMenu} />
      </div>
    );
  }
}

export default App;
