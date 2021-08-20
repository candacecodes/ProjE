import React, { Component } from "react";

export default class FoodLogs extends Component {
	render() {
		return (
			<>
				<h1>Food Logs Page</h1>
				<div>
					<h3>Log Meal</h3>
					<br />
					Date: Today
					<br />
					<select name="" id="">
						<option value="breakfast">Breakfast</option>
						<option value="lunch">Lunch</option>
						<option value="dinner">Dinner</option>
						<option value="snack">Snack</option>
					</select>
					<br />
					Contained which foods?
					<br />
				</div>
			</>
		);
	}
}
