import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import http from "http"


setInterval(function(){
	http.get("http://chartbitxmen.herokuapp.com/")
	console.log("hello")
}, 1000 * 60 * 5)

ReactDOM.render(
	React.createElement(App),
	document.getElementById('root')
);
