 import React from 'react';

 export default class Blogcard extends React.Component {
 //this will hold the blog post card with the information(title, location, photo)
 constructor(){
 	super();
 	this.state = {
 		title:'',
 		location:'',
 		photo:'',
 		closePost:false
 	}
 	this.showPost = this.showPost.bind(this);
 	this.hidePost = this.hidePost.bind(this);
 	}
 	showPost(e){
		e.preventDefault();
		this.blogContent.classList.add('focus');
		this.overlayPost.classList.add('show');
		this.setState({
			closePost: true
		})
 	}
 	hidePost(e){
 		e.preventDefault();
 		e.stopPropagation();
 		console.log('removing class');
 		console.log(this.blogContent);
 		this.blogContent.classList.remove('focus');
 		this.overlayPost.classList.remove('show');
 		this.setState({
 			closePost: false
 		});
 	}
 	render(){
 		return (
 			<li className="blogContent" onClick={this.showPost} ref={ ref => this.blogContent = ref}>
 				{(()=>{
 					if(this.state.closePost) {
 						return (<button onClick={this.hidePost} ref={ ref => this.blogContent = ref} >
	 						<i className="fa fa-times" aria-hidden="true"></i>
	 					</button>)
 					}
 				})()}
 				<div className="overlayPost" ref={ ref => this.overlayPost = ref}></div>
 				<h2 className="cardTitle">{this.props.data.title}</h2>
		 		<p className="cardLocation"><i className="fa fa-compass" aria-hidden="true"></i>
					{this.props.data.location}</p>
		 		<img className="cardPhoto" src= {`${this.props.data.photo}`} />
		 		<p className="cardNote"><i className="fa fa-sticky-note-o" aria-hidden="true"></i>
					{this.props.data.note}</p>
		 		<button className="button button__remove" onClick={() => this.props.remove(this.props.data)}>
		 			<i className ="fa fa-trash" aria-hidden="true"></i>
		 		</button>
	 		</li>
 		)
 	}
 }


 