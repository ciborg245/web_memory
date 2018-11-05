import React from 'react'
import ReactDom from 'react-dom'
import './board.css'
import Card1 from '../img/img1.png'
import Card2 from '../img/img2.png'
import Card3 from '../img/img3.png'
import Card4 from '../img/img4.png'
import Card5 from '../img/img5.jpg'
import Card6 from '../img/img6.jpg'
import Card7 from '../img/img7.jpg'
import Card8 from '../img/img8.jpg'

class Board extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			selected: null,
			board: null,
			cols: 4,
			rows: 4,
			current: null,
			cardsState: Array(16).fill('card'),
			refresh: true,
			images: [Card1, Card2, Card3, Card4, Card5, Card6, Card7, Card8],
			ranImgs: Array(16).fill(null)
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
			this.state.ranImgs[i] = (this.state.images[Math.floor(numbers[randomPos]/2)]);
			numbers.splice(randomPos,1);
		}
		// console.log(this.state.ranImgs);
		this.state.board = newGrid;
	}

	handleClick(index){
		if (this.state.selected === index || !this.state.refresh) return;

		this.setState({current: index});
		this.state.cardsState[index] = 'card is-flipped';

		if (this.state.selected != null) {

			this.setState({refresh: false})
			setTimeout(() => {
				if (this.state.board[index] == this.state.board[this.state.selected]) {
					console.log("you win");
				} else {
					this.state.cardsState[this.state.selected] = 'card';
					this.state.cardsState[index] = 'card';
				}
				this.setState({
					selected: this.state.selected == null ? index : null,
					refresh: true
				});
			}, 500);

		} else {
			this.setState({selected: this.state.selected == null ? index : null});
		}
	}


	render(){
		return (
			<div className = "mainDiv">
			<div className = "header">
				<div className = "title"> Memory </div>
			</div>
			<div className = "gridStyle">
				{
					this.state.board.map((el, index)=>{
						return (
							<div className="container">
								<div className = {this.state.cardsState[index]}>
									<div
										key={index}
										className="front"
										onClick = {this.handleClick.bind(this, index)}>

										{this.state.board[index]}
									</div>
									<div
										style = {{backgroundImage: 'url(' +this.state.ranImgs[index]+ ')',
										backgroundPosition: 'center',
										backgroundSize: 'cover'}}
										key={40+index}
										className="back">
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
			</div>
		)
	}
}

ReactDom.render(
	<Board />,
	document.getElementById('root')
)
