// simple JS website to slideshow thru images

// import {image_objecs} from './getS3Objects.js';


var ct = 0; 			// Start Point
var images = [];	// Images Array
var reko_ct = []; // Pie Rekognition counter Array
var pie_ct = 0;   // number of total pies recognized
var time = 3000;	// Time Between Switch

// folder prefix
var imgObjs;	 

// we preload an image to avoid blank img for first 3 secs
images[0] = "images/heic2007a.jpg";
reko_ct[0] = 0;

// fetch the images file-names and their Rekognition pie-count
// format is eg
// images/black_hole_space_outer_space_216348.jpg,1
async function fetchImages() {
  let obj;

  const res = await fetch('images.txt')

  obj = await res.text();

  console.log(obj)

  var arr = obj.split("\n");

	// avoid the empty str at end of arr by doing len - 1
  for (var i = 0; i < arr.length - 1; i++) {
  	
  	// split the current string on ","
  	const img_reko = String(arr[i]).split(',');
  	
  	// now get everything before the ','
  	images.push(img_reko[0]);
  	
  	// now get the pie reko count per image - ie after the ','
  	reko_ct.push(parseInt(img_reko[1]));
  	
  }
  
  console.log("Images: ", images)
  console.log("Reko_ct: ", reko_ct)
	
}

fetchImages();


// Change Image
async function changeImg() {
    
	document.slide.src = images[ct];

	// Check If Index Is Under Max - last entry is empty str so deduct that one
	if(ct < images.length - 1) {
	  // Add 1 to Index
	  ct++; 
	  
	  // increase the Reko count of label >= 1 
	  pie_ct += reko_ct[ct-1]
	  
	} else { 
		// Reset Back 
		ct = 1;
		pie_ct = 0;
	}
	
	document.getElementById("rekocount").innerHTML = pie_ct;
	
	// Run function every x seconds
	setTimeout("changeImg()", time);
}

// Run function when page loads
window.onload=changeImg;
