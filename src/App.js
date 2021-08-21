import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Link, NavLink } from "react-router-dom";
import Foods from "./pages/Foods";
import FoodLogs from "./pages/FoodLogs";
import Menu from "./pages/Menu";
import ReactionLogs from "./pages/ReactionLogs";
import Report from "./pages/Report";

import "./App.css";

const Header = () => (
	<BrowserRouter>
		<header>
			<h1>Elimination Diet</h1> <br />
			<NavLink to="/">Menu</NavLink>
			<br />
			<NavLink to="/foods">Foods</NavLink>
			<br />
			<NavLink to="/foodlogs">Food Logs</NavLink>
			<br />
			<NavLink to="/reactionlogs">Reaction Logs</NavLink>
			<br />
			<NavLink to="/report">Report</NavLink>
		</header>
	</BrowserRouter>
);

export default class App extends Component {
	state = {
		foods: [],
	};

	render() {
		return (
			<>
				<Header />
				<BrowserRouter>
					<Switch>
						<main id="page-wrap">
							<Route exact path="/menu" component={Menu} />
							<Route exact path="/foods" component={Foods} />
							<Route exact path="/foodlogs" component={FoodLogs} />
							<Route exact path="/reactionlogs" component={ReactionLogs} />
							<Route exact path="/report" component={Report} />
						</main>
					</Switch>
				</BrowserRouter>
			</>
		);
	}
}
