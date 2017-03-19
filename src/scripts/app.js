import React from 'react';
import ReactDOM from 'react-dom';
import { ajax } from 'jquery';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import Blogcard from './components/Blogcard';
import Autocomplete from 'react-google-autocomplete';


const apiKey ='AIzaSyB1EIPG-WkM1tGCOP_sLE57sxcuz8DE-Vg';

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
			posts:[],
			filteredPosts: [],
			location: '',
			photo: '',
			search: '',
			title: ''
		}
		this.addPost = this.addPost.bind(this);
		this.uploadPhoto = this.uploadPhoto.bind(this);
		this.trackChange = this.trackChange.bind(this);
		this.searchToState = this.searchToState.bind(this);
		this.searchPosts = this.searchPosts.bind(this);
	}
	componentDidMount(){
		const dbRef = firebase.database().ref();

		firebase.auth().onAuthStateChanged((user) => {
			if(user){
				dbRef.on('value', (data) => {
				const databaseData = data.val();
				const postArray = [];

				for(let itemKey in databaseData){
					const postKey = databaseData[itemKey];
					postKey.key = itemKey;
					postArray.push(databaseData[itemKey]);
				}
				console.log(postArray);
				this.setState({
				posts:postArray
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
	uploadPhoto(e){
		// const fileButton = document.getElementById('fileButton');
		// // listen for file selection
		let file = e.target.files[0]
		// create storage ref
		const storageRef =firebase.storage().ref('userPhotos/' + file.name);
			// upload file
		const task = storageRef.put(file);
		const urlObject = storageRef.getDownloadURL().then((data) => {
		 console.log(data);
		 this.setState ({ 
		 photo: data
		});})
	}
	addPost(e){
		e.preventDefault();
		//submit information to firebase
		//close form modal and hide
		//add new post tile to the home page
		const post = {
			title: this.state.title,
			location: this.state.location,
			note:this.state.note,
			photo: this.state.photo
			};
			const dbRef = firebase.database().ref();
			dbRef.push(post);
	}
	getLocation(){
		//run google autocomplete on the input of location
		//on click of specific location set that user location to that clicked (google) value
	}
	searchToState(e){
		this.setState({
			search: e.target.value
		})
	}
	searchPosts(e){
		e.preventDefault();
		//join takes all of blogcards object properties and combines into a string to be able to search the whole card versus one element
		//includes looks for the value within that string 
		const filtered = this.state.posts.filter(post => {
		  return Object.values(post).join(',').includes(this.state.search);
		})
		console.log(this.state.search);
		this.setState({
		 filteredPosts: filtered
		})
	}
	render(){
		let postView ='';
		if (this.state.search === ""){
			postView = (
				<ul>
					{this.state.posts.map((item) => {
						return <Blogcard data={item} />
					})}
				</ul>
		)} else {
			postView = ( 
				<ul>
					{this.state.filteredPosts.map((item) => { return <Blogcard data={item} />
						})}
				</ul>
			)
		}
		return (
			<div>
				<Header />
				<Searchbar searchToState ={this.searchToState} searchPosts = {this.searchPosts}/>
				<form htmlFor="postForm" onSubmit={this.addPost}>
					<label htmlFor="title">Title:</label>
					<input type="text" name="title" onChange={this.trackChange}/>
					<label htmlFor="location">Location:</label>
					<Autocomplete name="location" className="autocompleteInput" style={{width: '20%'}} onChange={this.trackChange} onPlaceSelected={(place) => {console.log(place.name)}
					}  types={['establishment','geocode']} />
					<label htmlFor="photo">Image</label>
					<input type="file" name="photo" accept="image/*" onChange={this.uploadPhoto} />
					<label htmlFor="title">Note</label>
					<textarea type="text" name="note" rows="4" cols="50" onChange={this.trackChange}></textarea>
					<button classID="fileButton">Add Post</button>
				</form>
				<section className="blogPage">
				{postView}
				</section>
			</div>
		)
	}
}


ReactDOM.render(<App />, document.getElementById('app'));

// goes usually with the title input ~ line 133
// <input type="text" name="location" onChange={this.trackChange}/>