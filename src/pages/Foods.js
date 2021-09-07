import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "../App.css";

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

		// state for keeping track of reactions
		reactions: {},
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
		// console.log(this.state.foodLog);
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
					{/* <h3>Log Meal</h3> */}
					<br />
					Date <br />
					<input
						// class="calendar"
						onChange={(value) => this.handleDateChange(value)}
						type="date"
						min="2020-01-01"
						max="2021-12-31"
					></input>
					<br />
					<br />
					Select Meal <br />
					<select
						class="select-bar"
						id="select-meal"
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
					Current Skin Condition
					<br />
					<select
						class="select-bar"
						defaultValue={this.state.reaction}
						onChange={(value) => this.handleReactionChange(value)}
					>
						<option value="Dry Skin">Dry Skin</option>
						<option value="Itching">Itching</option>
						<option value="Red/brown patches">Red/brown patches</option>
						<option value="Raised bumps">Small, raised bumps</option>
						<option value="Small, raised bumps, leaking fluid">
							Small, raised bumps, leaking fluid
						</option>
						<option value="Thickened, cracked, scaly skin">
							Thickened, cracked, scaly skin
						</option>
						<option value="Raw, sensitive, swollen skin from scratching">
							Raw, sensitive, swollen skin from scratching
						</option>
					</select>
					<br />
					<button class="button" onClick={() => this.submitFoodLog()}>
						Submit
					</button>
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
		// console.log("submit food log");
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

		this.allergyAlgorithm(t);
		// console.log(this.state.foodLog);
	};

	allergyAlgorithm = (t) => {
		let date = new Date(t);
		let twoDaysBefore = date - 1000 * 60 * 60 * 24 * 1;
		//- 1,000 ms * 60 s * 60 mins * 24 hrs * (# of days beyond one to go back)
		twoDaysBefore = new Date(twoDaysBefore);
		twoDaysBefore = twoDaysBefore.toString();
		this.formatDate(twoDaysBefore);
	};

	formatDate = (date) => {
		// const newReactionForDate-1/2 = {
		// take the date - 1/ 2
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		let twoDaysBefore = [year, month, day].join("-");
		// find key for that date in foodLog
		this.findMatchingFoodLog(twoDaysBefore);
	};

	// take food values
	findMatchingFoodLog = (date) => {
		// console.log(date); // date that is two days before logged input
		if (this.state.foodLog[date]) {
			// returns food values from matching date
			let foods = this.state.foodLog[date].foodSelectedKey;
			let reaction = this.state.foodLog[date].reactionKey;
			// console.log(foods);
			this.updateReactions(foods, reaction);
		} else {
			console.log("no match");
		}
	};

	updateReactions = (foods, reaction) => {
		foods.forEach((updatedFood) => {
			// this if statement checks if the reaction has the updatedFood
			if (this.state.reactions.hasOwnProperty(updatedFood)) {
				let nestedFoodKey = { ...this.state.reactions[updatedFood] };
				// checks that particular reaction is in the updatedFood object
				// TO DO:
				if (nestedFoodKey.hasOwnProperty(reaction)) {
					console.log("part 1 of updatedReactions");
					let value = parseInt(this.state.reactions[updatedFood][reaction] + 1);
					console.log(nestedFoodKey, value);
					let updatedNestedFoodKey = { [reaction]: value };
					let findFood = this.state.reactions[updatedFood];
					let updatedNestedFoodValues = {
						...findFood,
						...updatedNestedFoodKey,
					};
					this.setState((prevState) => ({
						reactions: {
							...prevState.reactions,
							[updatedFood]: {
								...prevState.reactions.updatedFood,
								...updatedNestedFoodValues, // REPLACE WITH X
							},
						},
					}));
					console.log(this.state.reactions);
				} else {
					console.log("part 2A of function");
					// has the food key but not the reaction key
					console.log("no reaction key");
					// create an object with that reaction key and set it to one
					let findFoodKey = { ...this.state.reactions[updatedFood] };
					let updatedReaction = { [reaction]: 1 };
					let updatedFoodKey = { ...findFoodKey, ...updatedReaction };
					console.log("updated food key", updatedFoodKey);

					this.setState((prevState) => ({
						reactions: {
							...prevState.reactions,
							[updatedFood]: {
								...prevState.reactions.updatedFood,
								...updatedFoodKey,
							},
						},
					}));
				}
			} else {
				console.log(updatedFood, "not in reactions");
				// create an object, [ food ] : { [ reaction ] : 1 }
				let newFoodReaction = { [updatedFood]: { [reaction]: 1 } };
				// set state for for reactions
				this.setState((prevState) => ({
					reactions: { ...prevState.reactions, ...newFoodReaction },
				}));
			}
		});
	};

	// after the updateReactions function, the values should be update to
	// { food: {reaction1 : 1}, { reaction2 : 2 }, { reaction3 : 3 }, etc }
	// when rendering which foods are triggers
	// go through reactions list, find foods that have high values and return them

	//handle date change
	handleDateChange = (e) => {
		// console.log("handle date change");
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
								Common Eczema Triggers:
								<select
									class="select-bar"
									name="input"
									value={this.state.input}
									onChange={this.handleChange}
								>
									<option value="Citrus Fruits">Citrus Fruits</option>
									<option value="Dairy">Dairy</option>
									<option value="Eggs">Eggs</option>
									<option value="Fish">Fish</option>
									<option value="Gluten or Wheat">Gluten or Wheat</option>
									<option value="Soy">Soy</option>
									<option value="Spices">
										Spices (Vanilla, Cloves, Cinnamon)
									</option>
									<option value="Shellfish">Shellfish</option>
									<option value="Tomatoes">Tomatoes</option>
								</select>
								<input type="submit" value="Submit" class="button" />
								<br />
								<br />
								Include Custom Food:
								<input
									id="custom-food-input-button"
									type="text"
									name="input"
									value={this.state.input}
									onChange={this.handleChange}
								/>
							</label>
							<br />
							<input type="submit" value="Submit" class="button" />
							<br />
							<br />
						</form>
						<button class="button" onClick={this.displayFoodsToggle}>
							See Food List
						</button>
						<br />
						{this.state.displayFoods ? this.renderFoods() : null}
					</div>

					<div class="card" id="middlebox">
						<button
							class="button"
							id="log-a-meal-button"
							onClick={this.foodLogToggle}
						>
							Log a Meal
						</button>
						{this.state.foodLog ? this.foodLog() : null}

						<br />
					</div>
					<div class="card" id="rightbox">
						{/* toggle for see foods  */}
						<button class="button" onClick={this.displayFoodLogToggle}>
							See Food Logs
						</button>
						<div>{this.state.displayLogs ? this.displayFoodLogs() : null}</div>
						<br />

						{/* toggle to filter by food  */}
						<div>
							<button class="button" onClick={this.displayLogByFoodToggle}>
								Filter by Food
							</button>
						</div>
						<button class="button" onClick={this.resetFoodFilter}>
							Reset Filter
						</button>
						<br />
						<div>
							<button class="button" onClick={this.findMatches}>
								Find Matches
							</button>
							<br />
							{this.state.logs}
						</div>
						<div>
							{this.state.displayLogByFoodToggle ? this.filterByFood() : null}
						</div>
						<br />

						{/* toggle to filter by reaction  */}
						{/* <button onClick={this.displayLogByReactionToggle}>
							Filter by Reaction
						</button> */}

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
