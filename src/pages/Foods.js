import React, { Component } from "react";

export default class Foods extends Component {
	state = {
		food: [],
		displayFoods: false,
	};

	// handle submit for food list
	handleSubmit = (e) => {
		e.preventDefault();
		console.log(e);
		this.setState({ food: [...this.state.food, this.state.input] });
		console.log(this.state);
	};

	// handle change for food input
	handleChange = (e) => {
		let { name, value } = e.target;
		this.setState({ [name]: value });
		console.log(this.state);
	};

	// toggle state for food list
	displayFoodsToggle = () => {
		this.setState((prevState) => ({
			displayFoods: !prevState.displayFoods,
		}));
	};

	deleteFood = (item) => {
		// console.log(item);
		this.setState({
			food: this.state.food.filter((e) => e !== item),
		});
		console.log(this.state);
	};

	// render food list after clicking food list
	renderFoods = () => {
		console.log(this.state);
		return (
			<>
				<div>
					{this.state.food.map((item) => {
						return (
							<div>
								{item}
								<br />
								<button onClick={() => this.deleteFood(item)}>Delete</button>
							</div>
						);
					})}
				</div>
			</>
		);
	};

	render() {
		return (
			<>
				<form onSubmit={(e) => this.handleSubmit(e)}>
					<label>
						Add Food : <br />
						<input
							type="text"
							name="input"
							value={this.state.input}
							onChange={this.handleChange}
						/>
					</label>
					<input type="submit" value="Submit" />
					<br />
					<br />
				</form>
				<div>
					{" "}
					<button onClick={this.displayFoodsToggle}>Food List</button>
					<br />
					{this.state.displayFoods ? this.renderFoods() : null}
				</div>
			</>
		);
	}
}
