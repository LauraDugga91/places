import React from 'react';

 export default function Searchbar ({searchPosts, searchToState}) {
 // console.log(searchPosts, searchToState);
 	return (
 			<form onSubmit={searchPosts} className ="form__search">
 				<label htmlFor="search"></label>
 				<input placeholder="search posts..." className="form__search--input" type="text" name="search" onChange={searchToState}/>
 				<button className="button button__submit button__submit--width">SEARCH</button>
 			</form>
 		)
 }