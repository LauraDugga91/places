import React from 'react';
var fuzzy = require('fuzzy');




export default class Searchbar extends React.Component {
	constructor(){
		super();
		this.state = {
		//want to take this userSearch value and plug that into the searchPosts function and have the blog cards/posts to show up according to this
			userSearch:''
		}
		this.handleSearch = this.handleSearch.bind(this);
		this.searchPosts = this.searchPosts.bind(this);
	}
	handleSearch(e){
		console.log(this.state.location);
		this.setState({
			[e.target.name]: e.target.value
			
		})
	}
	searchPosts(e){
		e.preventDefault();
		// let list = the blogCard in the app.js 
		//goal is the search through all blog cards/ posts to find posts that contain search params
		//want to filter through each element in that blog to show only the applicable blog cards on the page

// example: 
// var list = ['baconing', 'narwhal', 'a mighty bear canoe'];
// var results = fuzzy.filter('bcn', list)
// var matches = results.map(function(el) { return el.string; });
// console.log(matches);
		

		// let list = all of blog cards elements (h1 & p elements)
		// let blogList = ALL BLOG POSTS 
		// let result = ?? not sure where 'bcn' is coming from in example ???, blogList
		// let filteredBlogList = results.map(??? ) 
	}
	render(){
		return (
			<form onSubmit={this.searchPosts} className ="searchBar">
				<label htmlFor="search">Search Posts:</label>
				<input type="text" name="search" onChange={this.handleSearch} />
				<button>Search</button>
			</form>
		)
	}
}



