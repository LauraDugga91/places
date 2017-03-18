import React from 'react';

export default class Searchbar extends React.Component{
	render(){
		return (
			<form>
				<label htmlFor="search"></label>
				<input type="text" name="search"/>
			</form>
		)
	}
}