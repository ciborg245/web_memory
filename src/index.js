import React from 'react'
import ReactDom from 'react-dom'
import './board.css'

class Board extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			selected: null,
			board: null,
			cols: 5,
			rows: 4,
		}

		this.randomizeGrid();
	}

	randomizeGrid() {
		const cardsCont = this.state.cols * this.state.rows;
		let numbers = [...Array(cardsCont).keys()];

		let newGrid = [];
		for (let i = 0; i < cardsCont; i++) {
			let randomPos = Math.floor(Math.random()*numbers.length);
			newGrid.push(Math.floor(numbers[randomPos]/2));
			numbers.splice(randomPos,1);
		}

		this.state.board = newGrid;

		// for (let i = 0; i < this.state.rows; i++) {
		// 	this.state.board[i] = this.state.board[i].map((el, index) => newGrid[this.state.cols*i+index]);
		// }
		// console.log(this.state.board)
	}

	handleClick(index){
		if (this.state.selected === index) return;

		if (this.state.selected != null) {
			console.log(index);

			if (this.state.board[index] == this.state.board[this.state.selected]) {
				console.log("you win")
			}
		}

		this.state.selected = this.state.selected == null ? index : null;
	}


	render(){
		const animationStyle = {
			transform: 'rotateY(180deg)'
		}
		return (
			<div className = "gridStyle">
				{
					this.state.board.map((el, index)=>{
						return (
							<div className="container">
								<div className={`card ${this.state.selected != null ? "is-flipped" : ""}`}>
									<div
										key={index}
										className="front"
										onClick = {this.handleClick.bind(this, index)}>

										{this.state.board[index]}
									</div>
									<div
										key={40+index}
										className="back"
										onClick = {this.handleClick.bind(this, index)}>
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
		)
	}
}

ReactDom.render(
	<Board />,
	document.getElementById('root')
)
