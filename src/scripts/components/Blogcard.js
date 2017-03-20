 import React from 'react';

 export default function Blogcard(props) {
 //this will hold the blog post card with the information(title, location, photo)
 	return (
 		<li className="blogContent">
	 		<h2 className="cardTitle">{props.data.title}</h2>
	 		<p className="cardLocation">{props.data.location}</p>
	 		<img className="cardPhoto" src= {`${props.data.photo}`} />
	 		<p className="cardNote">{props.data.note}</p>
	 		<button onClick={() => props.remove(props.data)}>Remove Item</button>
 		</li>
 	)
 }