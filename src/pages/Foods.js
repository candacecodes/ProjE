import React, { Component } from "react";

export default class Foods extends Component {
	state = {
		// food state if part of the list for users
		food: [],

		// log food is for the logged entries
		foodLog: {},

		// toggle handlers
		displayFoods: false,
		displayLogs: false,
		displayLogByDateToggle: false,
		displayLogByFoodToggle: false,
		displayLogByReactionToggle: false,
		// onChange handlers for state
		date: "01-01-2021",
		meal: "breakfast",
		foodsSelected: [],
		reaction: "neutral",

		// used for when filtering food entries
		dateFilter: [],
		reactionFilter: [],
		foodFilter: [],

		// creating an object for matched logs
		logs: null,
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
	foodLogToggle = () => {
		this.setState((prevState) => ({
			foodLog: !prevState.foodLog,
		}));
	};

	//toggle state for see food logs button
	displayFoodLogToggle = () => {
		this.setState((prevState) => ({
			displayLogs: !prevState.displayLogs,
		}));
	};

	// toggle for filter by date button
	displayLogByDateToggle = () => {
		this.setState((prevState) => ({
			displayLogByDateToggle: !prevState.displayLogByDateToggle,
		}));
		console.log(this.state.displayLogByDateToggle);
	};

	// toggle for filter by food button
	displayLogByFoodToggle = () => {
		this.setState((prevState) => ({
			displayLogByFoodToggle: !prevState.displayLogByFoodToggle,
		}));
		console.log(this.state.displayLogByFoodToggle);
	};

	// toggle for filter by reaction button
	displayLogByReactionToggle = () => {
		this.setState((prevState) => ({
			displayLogByReactionToggle: !prevState.displayLogByReactionToggle,
		}));
		console.log(this.state.displayLogByReactionToggle);
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
		console.log(this.state.foodLog);
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
	foodLog = () => {
		return (
			<>
				<div>
					<h3>Log Meal</h3>
					<br />
					Date <br />
					<input
						onChange={(value) => this.handleDateChange(value)}
						type="date"
						min="2020-01-01"
						max="2021-12-31"
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
						<option value="good">&#128522; Good</option>
						<option value="neutral">&#128528; Neutral</option>
						<option value="tired">&#128555; Tired </option>
						<option value="sleepy">&#128564; Sleepy</option>
						<option value="nauseous">&#129314; Nauseous</option>
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
			let filtered = this.state.foodsSelected.filter((food) => food != item);
			this.setState({ foodsSelected: filtered });
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
		const newLog = {
			dateKey: date,
			mealKey: meal,
			foodSelectedKey: foodsSelectedSubmission,
			reactionKey: reaction,
		};

		// this set state only preserves one object
		let t = date.toString();

		this.setState((prevState) => ({
			foodLog: { ...prevState.foodLog, [t]: newLog },
		}));

		console.log(this.state.foodLog);
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

	// displayFoodLogs helper function
	_renderFoodLogs = (foodLog) => {
		return Object.entries(foodLog).map(([key, value], i) => {
			return (
				<div>
					{value.dateKey}
					<br />
					{value.mealKey}
					<br />
					{value.foodSelectedKey}
					<br />
					{value.reactionKey}
					<br />
				</div>
			);
		});
	};

	// display food logs
	displayFoodLogs = () => {
		console.log("display food logs");
		const foodLog = this.state.foodLog;
		return (
			<>
				<div>{this._renderFoodLogs(foodLog)}</div>
			</>
		);
	};

	filterByFood = () => {
		return (
			<>
				<div>
					{this.state.food.map((item) => {
						return (
							<div>
								{item}
								<br />
								<button onClick={() => this.addToFoodFilter(item)}>
									Select
								</button>
							</div>
						);
					})}
				</div>
			</>
		);
	};

	addToFoodFilter = (item) => {
		if (!this.state.foodFilter.includes(item)) {
			this.setState({ foodFilter: [...this.state.foodFilter, item] });
		}
		console.log(this.state.foodFilter);
	};

	resetFoodFilter = () => {
		this.setState({ foodFilter: [] });
		console.log(this.state.foodFilter);
	};

	findMatches = () => {
		const foodLog = this.state.foodLog;
		const foodFilter = this.state.foodFilter;
		console.log("food filter", foodFilter);

		const matchedLogs = [];
		Object.keys(foodLog).forEach((key, index) => {
			if (foodLog[key].foodSelectedKey.some((r) => foodFilter.includes(r))) {
				const matchedLog = foodLog[key];
				// this returns the div element from renderMatchedLogs
				matchedLogs.push(this.renderMatchedLogs(matchedLog));
			} else {
				// do nothing
			}

			const logs = <>{matchedLogs.map((div) => div)}</>;

			this.setState({ logs });
		});
	};

	renderMatchedLogs = (matchedLog) => {
		return (
			<div>
				{matchedLog.dateKey}
				<br />
				{matchedLog.mealKey}
				<br />
				{matchedLog.foodSelectedKey}
				<br />
				{matchedLog.reactionKey}
				<br />
			</div>
		);
	};

	render() {
		return (
			<>
				<div id="outerdiv">
					<div class="card" id="leftbox">
						<form onSubmit={(e) => this.handleSubmit(e)}>
							<label>
								Add Food to Track : <br />
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
						<button onClick={this.displayFoodsToggle}>Food List</button>
						<br />
						{this.state.displayFoods ? this.renderFoods() : null}
					</div>

					<div class="card" id="leftbox">
						<button onClick={this.foodLogToggle}>Log a Meal</button>
						{this.state.foodLog ? this.foodLog() : null}

						<br />
					</div>
					<div class="card" id="leftbox">
						{/* toggle for see foods  */}
						<button onClick={this.displayFoodLogToggle}>See Food Logs</button>
						<div>{this.state.displayLogs ? this.displayFoodLogs() : null}</div>
						<br />

						{/* toggle to filter by food  */}
						<div>
							<button onClick={this.displayLogByFoodToggle}>
								Filter by Food
							</button>
						</div>
						<button onClick={this.resetFoodFilter}>Reset Filter</button>
						<br />
						<div>
							<button onClick={this.findMatches}>Find Matches</button>
							<br />
							{this.state.logs}
						</div>
						<div>
							{this.state.displayLogByFoodToggle ? this.filterByFood() : null}
						</div>
						<br />

						{/* toggle to filter by reaction  */}
						<button onClick={this.displayLogByReactionToggle}>
							Filter by Reaction
						</button>

						{/* toggle to filter by date */}
						{/* <button onClick={this.displayLogByDateToggle}>
							Filter by Date
						</button>
						<br /> */}
						{/* <div>{this.state.displayLogByDateToggle ? this.filterByDate() : null}</div> */}
					</div>
				</div>
			</>
		);
	}
}
