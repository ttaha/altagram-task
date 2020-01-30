import React, { Component } from "react";
import { Starship } from "./Starship";
import "./App.css";
import { Button } from "@material-ui/core";

export interface IStarship {
  name: string;
  crew: string;
  passengers: string;
  hyperdrive_rating?: string;
}

interface IState {
  starships: IStarship[];
  current: number;
  perPage: number;
}
const NUM_ITEMS_PER_PAGE = 5;

class App extends Component<{}, IState> {
  componentDidMount() {
    fetch("https://swapi.co/api/starships/?format=json")
      .then(res => res.json())
      .then(data => {
        this.setState({
          starships: data.results,
          current: 0,
          perPage: NUM_ITEMS_PER_PAGE
        });
      })
      .catch(console.log);
  }
  previousClick = () => {
    if (this.state.current !== 0)
      this.setState({ current: this.state.current - 1 });
  };
  nextClick = () => {
    if (
      this.state.current + 1 <
      this.state.starships.length / this.state.perPage
    )
      this.setState({ current: this.state.current + 1 });
  };

  render() {
    if (this.state) {
      const { current, perPage, starships } = this.state;
      const listStarships = starships
        .slice(current * perPage, current * perPage + perPage)
        .map(starship => {
          return <Starship starship={starship} />;
        });
      return (
        <div>
          <div>{listStarships}</div>
          <div className="App-pagination">
            <Button
              variant="contained"
              color="secondary"
              className="App-button"
              onClick={this.previousClick}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className="App-button"
              onClick={this.nextClick}
            >
              Next
            </Button>
          </div>
        </div>
      );
    }
    return <span>loading data...</span>;
  }
}

export default App;
