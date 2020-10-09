const express = require('express')
const Delaunator = require('delaunator');

const app = express()
const port = 3000

var http = require('http');

app.get('/cluster', (req, res) => {
	const points = [[168, 180], [168, 178], [168, 179], 
	[168, 181], [168, 183], [1, 2], [3, 4]];

	let body = "1"

	let options = {
	  hostname: "localhost:8080",
	  path: "/triangle",
	  method: "POST",
	  // headers: {
	  //   "Content-Type": "application/json",
	  //   "Content-Length": Buffer.byteLength(body)
	  // }
	}

	http
	  .request(options, response => {
	    let data = ""
	    response.on("data", d => {
	      data += d
	    })
	    response.on("end", () => {
	      console.log(data)
	    })
	  })
	  .on("error", console.error)
	  .end(body)


	const delaunay = Delaunator.from(points);
	console.log(delaunay.triangles);
  	res.send(delaunay.triangles);
  	//res.send(points);
})



// function(){
// 	var Xvalue = document.getElementById('Xinput')
// 	Math.floor(Math.random() * 11);   
// }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})