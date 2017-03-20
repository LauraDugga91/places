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
			title: '',
			newPostShow: false
		}
		this.addPost = this.addPost.bind(this);
		// this.getLocation = this.getLocation.bind(this);
		this.uploadPhoto = this.uploadPhoto.bind(this);
		this.trackChange = this.trackChange.bind(this);
		this.searchToState = this.searchToState.bind(this);
		this.searchPosts = this.searchPosts.bind(this);
		this.showForm = this.showForm.bind(this);
		// this.hideForm = this.hideForm.bind(this);
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
	showForm(e){
	//when new post clicked pop up module that shows the form
	e.preventDefault();
		console.log('shit works');
		this.setState({
		newPostShow: true
		});
	}
	trackChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	uploadPhoto(e) {
		let file = e.target.files[0];
		const storageRef = firebase.storage().ref('userPhotos/' + file.name);
		const task = storageRef.put(file).then(() => {
		const urlObject = storageRef.getDownloadURL().then((data) => {
		this.setState ({
			photo: data })
			})
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
			note:this.state.note,
			photo: this.state.photo,
			};
			const dbRef = firebase.database().ref();
			dbRef.push(post);
			this.setState({
				newPostShow: false
			})
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
	removePost(postToRemove){
		console.log(postToRemove);
		const dbRef = firebase.database().ref(postToRemove.key);
		dbRef.remove();
	}
	render(){
		let newPostForm = '';
		if(this.state.newPostShow === true){
			newPostForm = (
				<form className="form__post" htmlFor="postForm" onSubmit={this.addPost}>
					<label htmlFor="title">Title</label>
					<input type="text" name="title" className="form__post--input"onChange={this.trackChange}/>
					<label htmlFor="location">Location</label>
					<Autocomplete name="location" className="autocompleteInput form__post--input" style={{display: 'flex'}}  onPlaceSelected={(place) => {
						console.log(place);
						this.setState({
							location: place.formatted_address})}}  types={['establishment','geocode'] } />
					<label htmlFor="photo">Image</label>
					<input type="file" name="photo" className=" form__post--input" accept="image/*" onChange={this.uploadPhoto} />
					<label htmlFor="title">Note</label>
					<textarea type="text" name="note" className="form__post--input" rows="4" cols="50" onChange={this.trackChange}></textarea>
					<button>Add Post</button>
				</form>
			)
		}else{
			// newPostform = (
			// 	console.log('no form showing');
			// )
		}
		let postView ='';
		if (this.state.search === ""){
			postView = (
				<ul className="blogMason">
					{this.state.posts.map((item) => {
						return <Blogcard data={item} remove={this.removePost} key={item.key} />
					})}
				</ul>
		)} else {
			postView = ( 
				<ul className="blogMason">
					{this.state.filteredPosts.map((item) => { return <Blogcard data={item} remove={this.removePost} key={item.key} />
						})}
				</ul>
			)
		}
		return (
			<div>
				<Header />
					<button onClick={this.showForm}>+ New Post</button>
					{newPostForm}
					<Searchbar searchToState ={this.searchToState} searchPosts = {this.searchPosts}/>
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