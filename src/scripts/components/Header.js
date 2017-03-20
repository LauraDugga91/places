import React from 'react';

//header will execute the sign up form and login form to appear and will authorize user to view their posts native to that login 

export default class Header extends React.Component{
	constructor(){
		super();
		this.state = {
			showForm:'',
			email:'',
			password:'',
			confirm:''
		};
		this.showForm = this.showForm.bind(this);
		this.trackChange = this.trackChange.bind(this);
		this.signUp = this.signUp.bind(this);
		this.login = this.login.bind(this);
	}
	showForm(e){
		e.preventDefault();
		this.setState({
			showForm:e.target.className
		})
	}
	trackChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	signUp(e){
		//needs to holds if statement
		e.preventDefault();
		console.log('signing up');
		console.log(this.state.email, this.state.password, this.state.confirm);
		if(this.state.password === this.state.confirm){ firebase.auth()
			.createUserWithEmailAndPassword(
				this.state.email, this.state.password).then((userData) => {
					console.log(userData);
				})
		}else{
			console.log('please ensure passwords match')
		}
	}
	login(e){
		e.preventDefault();
		firebase.auth()
		.signInWithEmailAndPassword(this.state.email, this.state.password).then((userData)=>{
			console.log(userData);
		});
	}
	render(){
		//holds empty object where the selected form will go into
		let loginForm = '';
		if (this.state.showForm === 'signUp'){
			// sign up form
			loginForm = (
			<form onSubmit={this.signUp} className="userForm">
				<label htmlFor="email">Email:</label>
				<input type="email" name="email" onChange={this.trackChange} />
				<label htmlFor="password">Password:</label>
				<input type="password" name="password" onChange={this.trackChange} />
				<label htmlFor="confirm">Confirm:</label>
				<input type="password" name="confirm" onChange={this.trackChange} />
				<button>Create Account</button>
			</form>
			);
		} else if (this.state.showForm === 'login'){
			// login form
			loginForm =(
			<form onSubmit={this.login} className="userForm">
				<label htmlFor="email">Email:</label>
				<input type="email" name="email" onChange={this.trackChange} />
				<label htmlFor="email">Password:</label>
				<input type="password" name="password" onChange={this.trackChange} />
				<button>Log In</button>
			</form>
			);
		} else {
			// console.log('error');
		}
		return (
			<header>
				<ul>
					<li><a href="" className="signUp" onClick={this.showForm}>Create Account</a></li>
					<li><a href="" className="login" onClick={this.showForm}>Log In</a></li>
				</ul>
				{loginForm}
				<h1>Places</h1>
			</header>
		)
	}
}