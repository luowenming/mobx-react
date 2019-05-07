import {observable, action, computed} from 'mobx';
import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {observer, PropTypes as ObservablePropTypes} from 'mobx-react';

class Todo {
	id = Math.random();
	@observable title = '';
	@observable finished = false;
	
	constructor(title){
		this.title = title;
	}
	
	@action.bound toggle() {
		this.finished = !this.finished
	}
}

class Store {
	@observable todos = []
	
	@action.bound createTodo(title) {
		this.todos.unshift(new Todo(title));
	}
	
	@action.bound removeTodo(todo) {
		this.todos.remove(todo);
	}
	
	@computed get left() {
		return this.todos.filter(todo => !todo.finished).length;
	}
}

var store = new Store();

@observer
class TodoItem extends Component {
	static propTypes ={
		todo: PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			finished: PropTypes.bool.isRequired
		}).isRequired
	};
	
	handleChange = () => {
		this.props.todo.toggle();
	}
	
	render() {
		const todo = this.props.todo;
		return <Fragment>
			<input type="checkbox" className="toggle" defaultChecked={todo.finished} onClick={this.handleChange} />
			<span className={['title', todo.finished && 'finished'].join(' ')}>{todo.title}</span>
		</Fragment>;
	}
}

@observer
class TodoList extends Component {
	static propTypes = {
		store: PropTypes.shape({
			createTodo: PropTypes.func,
			todos: ObservablePropTypes.observableArrayOf(ObservablePropTypes.observableObject).isRequired
		}).isRequired
	}
	
	state = {
		input_value: ''
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		
		var store = this.props.store;
		var input_value = this.state.input_value;
		
		store.createTodo(input_value);
		
		this.setState({input_value: ''})
	}
	
	handleChange = (e) => {
		var input_value = e.target.value;
		this.setState({
			input_value
		})
	}
	
	render() {
		const store = this.props.store;
        const todos = store.todos;
		return <div className="todo-list">
				<header>
					<form onSubmit={this.handleSubmit}>
						<input type="text"  onChange={this.handleChange} className="input" value={this.state.input_value} placeholder="What needs to be finished?"/>
					</form>
				</header>
				<ul>
					{
						todos.map(todo => {
							return  <li key={todo.id} className="todo-item">
										<TodoItem todo={todo}/>
										<span className="delete" onClick={e=>store.removeTodo(todo)}>X</span>
									</li>
						})
					}
				</ul>
				<footer>{store.left} item(s) unfinished</footer>
			</div>
	}
}

ReactDOM.render(<TodoList store={store}/>, document.querySelector('#root'))