import {observable, action} from 'mobx';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {observer, PropTypes as ObservablePropTypes} from 'mobx-react';

class Todo {
	id = Math.random();
	@observable title = '';
	@observable finished = false;
	
	constuctor(title){
		this.title = title;
	}
}

class Store {
	@observable todos = []
}

let store = new Store();

@observer
class TodoList extends Component {
	static propTypes = {
		store: PropTypes.shape({
			todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
		}).isRequired
	}
	
	state = {
		input_value: ''
	}
	
	handleSubmit(e) {
		e.preventDefault();
		
	}
	
	handleChange(e) {
		let input_value = e.target.value;
		this.setState({
			input_value
		})
	}
	
	render() {
		return <div className="todo-list">
				<header>
					<form onSubmit={this.handleSubmit}>
						<input type="text"  onChange={this.handleChange}/>
					</form>
				</header>
				<ul></ul>
				<footer></footer>
			</div>
	}
}

ReactDOM.render(<TodoList store={store}/>, document.querySelector('#root'))