import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import Blogcard from './components/Blogcard';
import Autocomplete from 'react-google-autocomplete';

var fuzzy = require('fuzzy');

 console.log(fuzzy);


const apiKey ='AIzaSyB1EIPG-WkM1tGCOP_sLE57sxcuz8DE-Vg';

//autocomplete script 
// <Autocomplete
//     style={{width: '90%'}}
//     onPlaceSelected={(place) => {
//       console.log(place);
//     }}
//     types={['(regions)']}
//     componentRestrictions={{country: "ru"}}
// />


// firebase link
const config = {
   apiKey: "AIzaSyBCiX2kJEHBw3hq54L3OY6mb-tDg75E8ro",
   authDomain: "places-blog-2ddc9.firebaseapp.com",
   databaseURL: "https://places-blog-2ddc9.firebaseio.com",
   storageBucket: "places-blog-2ddc9.appspot.com",
   messagingSenderId: "639937116022"
 };
 firebase.initializeApp(config);

class App extends React.Component{
	constructor(){
		super();
		this.state = {
			blogPosts: [],
			title: '',
			location: '',
			photo: ''
		}
		this.addPost = this.addPost.bind(this);
		this.trackChange = this.trackChange.bind(this);
	}
	componentDidMount(){
		const dbRef = firebase.database().ref();


		firebase.auth().onAuthStateChanged((user) => {
			if(user){
				dbRef.on('value', (data) => {
				const databaseData = data.val();
				const postArray = [];

				for(let itemKey in databaseData){
					// console.log(itemKey);
					// console.log(databaseData[itemKey]);
					const postKey = databaseData[itemKey];
					postKey.key = itemKey;
					postArray.push(databaseData[itemKey]);
				}
					console.log(postArray);
					this.setState({
					blogPosts:postArray
					});
				});
			}
		})
	}
	showForm(){
	//when new post clicked pop up module that shows the form
	}
	trackChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	addPost(e){
		e.preventDefault();
		//submit information to firebase
		//close form modal and hide
		//add new post tile to the home page
		const post = {
			title: this.state.title,
			location: this.state.location,
			photo: this.state.photo
			};
			const dbRef = firebase.database().ref();
			dbRef.push(post);
	}
	getLocation(){
		//run google autocomplete on the input of location
		//on click of specific location set that user location to that clicked (google) value
	}
	render(){
		return (
			<div>
				<Header />
				<Searchbar />
				<form htmlFor="postForm" onSubmit={this.addPost}>
					<label htmlFor="title">Title:</label>
					<input type="text" name="title" onChange={this.trackChange}/>
					<label htmlFor="location">Location:</label>
					<input type="text" name="location" onChange={this.trackChange}/>
					<label htmlFor="photo">Image</label>
					<input type="file" name="photo" accept="image/*" onChange={this.trackChange} />
					<input type="text" name="photo" />
					<button>Add Post</button>
				</form>
				<section className="blogPage">
					<ul>
					{this.state.blogPosts.map((item) => {
						return <Blogcard data={item}/>
					})}
					</ul>
				</section>
			</div>
		)
	}
}


ReactDOM.render(<App />, document.getElementById('app'));