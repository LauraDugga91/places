 import React from 'react';

 export default function Blogcard(props) {
 //this will hold the blog post card with the information(title, location, photo)
 	return (
 		<li className="blogContent">
	 		<h1 className="cardTitle">{props.data.title}</h1>
	 		<p className="cardLocation">{props.data.location}</p>
	 		<p className="cardPhoto">{props.data.photo}</p>
 		</li>
 	)
 }
