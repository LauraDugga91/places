import React from 'react';

 export default function Searchbar ({searchPosts, searchToState}) {
 // console.log(searchPosts, searchToState);
 	return (
 			<form onSubmit={searchPosts} className ="searchBar">
 				<label htmlFor="search">Search Posts:</label>
 				<input type="text" name="search" onChange={searchToState}/>
 				<button>Search</button>
 			</form>
 		)
 }