import React, { Component } from "react";

export default class Foods extends Component {
	state = {
		food: [],
		displayFoods: false,
		displayLogs: false,
		logFood: [],
		date: "001",
		meal: "breakfast",
		foodsSelected: [],
		reaction: "neutral",
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

	//toggle state for add food
	logFoodToggle = () => {
		this.setState((prevState) => ({
			logFood: !prevState.logFood,
		}));
	};

	//toggle state for see food logs
	displayFoodLogToggle = () => {
		this.setState((prevState) => ({
			displayLogs: !prevState.displayLogs,
		}));
	};

	// delete saved food
	deleteFood = (item) => {
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

	// log food display function
	logFood = () => {
		return (
			<>
				<h1>Food Logs Page</h1>
				<div>
					<h3>Log Meal</h3>
					<br />
					Date <br />
					<input
						onChange={(value) => this.handleDateChange(value)}
						type="date"
						min="2021-01-01"
						max="2021-12-31"
						value="2020-01-01"
					></input>
					<br />
					<br />
					Select Meal <br />
					<select
						defaultValue={this.state.meal}
						onChange={(value) => this.handleMealChange(value)}
					>
						<option value="breakfast">Breakfast</option>
						<option value="lunch">Lunch</option>
						<option value="dinner">Dinner</option>
						<option name="meal" value="snack">
							Snack
						</option>
					</select>
					<br />
					<br />
					Contained which foods?
					<br />
					{this.state.food.map((item) => {
						return (
							<div>
								{item}
								<input
									value={item}
									onChange={() => this.updateFoodsSelected(item)}
									type="checkbox"
								></input>
							</div>
						);
					})}
					<br />
					Food Reaction
					<br />
					<select
						defaultValue={this.state.reaction}
						onChange={(value) => this.handleReactionChange(value)}
					>
						<option value="good">&#128522;</option>
						<option value="neutral">&#128528;</option>
						<option value="tired">&#128555;</option>
						<option value="sleepy">&#128564;</option>
						<option value="nauseous">&#129314;</option>
					</select>
					<br />
					<br />
					<button onClick={() => this.submitFoodLog()}>Submit</button>
				</div>
			</>
		);
	};

	// update foods selected, from radio button
	updateFoodsSelected = (item) => {
		if (!this.state.foodsSelected.includes(item)) {
			this.setState({ foodsSelected: [...this.state.foodsSelected, item] });
		} else {
			this.state.foodsSelected.filter((food) => food !== item);
		}
		console.log(this.state.foodsSelected);
	};

	// select meal
	handleMealChange = (e) => {
		console.log("update meal");
		console.log(e.target.value);
		const updatedMeal = e.target.value;
		this.setState({ meal: updatedMeal });
		console.log(this.state);
	};

	//submit food log
	submitFoodLog = () => {
		console.log("submit food log");
		const date = this.state.date;
		const meal = this.state.meal;
		const foodsSelectedSubmission = this.state.foodsSelected;
		const reaction = this.state.reaction;
		const newLog = [date, meal, foodsSelectedSubmission, reaction];
		this.setState({
			logFood: [...this.state.logFood, newLog],
		});
		console.log(this.state);
	};

	//handle date change
	handleDateChange = (e) => {
		console.log("handle date change");
		const updatedDate = e.target.value;
		this.setState({ date: updatedDate });
	};

	//handle reaction change
	handleReactionChange = (e) => {
		console.log("update reaction");
		console.log(e.target.value);
		const updatedReaction = e.target.value;
		this.setState({ reaction: updatedReaction });
		console.log(this.state);
	};

	// display food logs not working
	displayFoodLogs = () => {
		console.log("display food logs");
		console.log(this.state.logFood);
		return <div>{this.state.logFood}</div>;
		// this.state.logFood.map((log) => {
		// 	return (
		// 		<>
		// 			<div>
		// 				Food Log {log} <button>Delete</button>
		// 			</div>
		// 		</>
		// 	);
		// });
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
				<div>
					<button onClick={this.logFoodToggle}>Log a Meal</button>
					<br />
					<div>
						<button onClick={this.displayFoodLogToggle}>See Food Logs</button>
					</div>
					{this.state.logFood ? this.logFood() : null}
				</div>
				<div>{this.state.displayLogs ? this.displayFoodLogs() : null}</div>
			</>
		);
	}
}
