 import React from 'react';

 export default function Blogcard(props) {
 //this will hold the blog post card with the information(title, location, photo)
 	return (
 		<li className="blogContent">
	 		<h2 className="cardTitle">{props.data.title}</h2>
	 		<p className="cardLocation"><i className="fa fa-compass" aria-hidden="true"></i>
				{props.data.location}</p>
	 		<img className="cardPhoto" src= {`${props.data.photo}`} />
	 		<p className="cardNote"><i className="fa fa-sticky-note-o" aria-hidden="true"></i>
				{props.data.note}</p>
	 		<button className="button button__remove" onClick={() => props.remove(props.data)}>
	 			<i className ="fa fa-trash" aria-hidden="true"></i>
	 		</button>
 		</li>
 	)
 }