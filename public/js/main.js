//color picker
const canvas = document.querySelector('#canvas')
var hex, rgb
const pickedImg = document.querySelector('#picked').textContent
const logOutBtn = document.querySelector('#logout')

logOutBtn.addEventListener('click', loggingOut)
//returns an object holding x and y coordinates of the parameter's value aka canvas)
function getPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

//returns x and y coordinates of mouse event location
function getEventLocation(element,event){
    // Relies on the getPos function.
    var pos = getPos(element);

    return {
    	x: (event.pageX - pos.x),
      	y: (event.pageY - pos.y)
    };
}

//conversion
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

//draws image onto canvas
function drawImageFromWebUrl(sourceurl){
      var img = new Image();
      img.crossOrigin = "Anonymous";

      img.addEventListener("load", function () {
          // The image can be drawn from any source
          canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
      });
      img.setAttribute("src", sourceurl);
}
// Draw a base64 image if we try with an image from URL we'll get tainted canvas error
drawImageFromWebUrl(pickedImg); //allow users to input their own images

//starting event listener to return color wherever the mouse moves to on the canvas
canvas.addEventListener("mousemove",function(e){
	  var eventLocation = getEventLocation(this,e);
    var coord = "x=" + eventLocation.x + ", y=" + eventLocation.y;

    // Get the data of the pixel according to the location generate by the getEventLocation function
    var context = this.getContext('2d');
    var pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;

    // If transparency on the image
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
 				coord += "(Transparent color detected, cannot be converted to HEX)";
    }else{

    hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
    }
    // display color and coordinates.
    //document.querySelector('p').textContent = coord;
    document.querySelector('#preview').style.backgroundColor = hex;
},false);

//upon mouse event click take the color value in #preview and save to database (color log)
canvas.addEventListener("click", function(e){
	  var eventLocation = getEventLocation(this,e);
    var coord = "x=" + eventLocation.x + ", y=" + eventLocation.y;

    // Get the data of the pixel according to the location generate by the getEventLocation function
    var context = this.getContext('2d');
    var pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;

    // If transparency on the image
    if((pixelData[0] == 0) && (pixelData[1] == 0) && (pixelData[2] == 0) && (pixelData[3] == 0)){
 			var	status = "no color";
    }else{
    hex =("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
    }
    // display color and coordinates.
    // document.querySelector('p').textContent = status;
    console.log(`http://thecolorapi.com/id?hex=${hex}`);
    fetch(`http://www.thecolorapi.com/id?hex=${hex}`)
    .then(res => res.json())
    .then(response =>{
      console.log(response);
      let rgb = response.rgb.value
      let colorName = response.name.value
      document.querySelector('#preview').style.backgroundColor = hex;
      //document.querySelector('p').textContent = rgb || status

      saveColor(colorName, rgb, hex)
    })
    .catch(error =>{
      console.log(`API fetch failed: ${error}`)
    })
},false);

//saves color into database
function saveColor(name, rgb, hex){
  hex = `#${hex}`
  fetch('colors', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'alias': name,
      'rgb': rgb,
      'hex': hex
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data =>{
    console.log(data)
    //optimize: reload to "Color is saved to Color Log!" styled page timeout for a few then redirect back to activate page
    })
    window.location.href = '/colorlog'
  }

  function loggingOut(){
    fetch('logout', {
      method: 'get'
    })
    .then(response =>{
      if (response.ok) console.log('logged out')
    })
    .then(function(){
      window.location.href = '/'
    })
  }//closes logout funct
//============================================================================



// ========= chrome extension: activate (color picker) page ========== //
//as chrome extension pop up
//button to activate the color picker (color preview above the button. on mousemove the color changes)
//click within the page to save the color
//if user alrdy owns the color dont save to db

// ============ color log page ============= //
//navigation bar should navigate user throughout the app

// ============ make palette page ============= //

//needs better styling


// ============ palettes gallery page ========== //
//DISPLAY PALETTES from SPECIFIC USER from palettes collection on the page
// update req: change palette name && || description
// delete: delete palettes
