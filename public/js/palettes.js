class Color{
  constructor(alias, hex, rgb){
    this.alias = alias;
    this.hex = hex;
    this.rgb = rgb;
  }
}
//declare global variables (will be used within many functions)
let arrColors = []
const canvas = document.getElementById('canvas'),
ctx = canvas.getContext('2d'),
checkboxes = document.querySelectorAll('.addColor');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function(){

    //if its not checked remove from array, if it is, add to array
    if(!this.checked){
      for( var i = 0; i < arrColors.length; i++){
        if (arrColors[i] === this.parentNode.parentNode.childNodes[3].childNodes[3].textContent) {
          arrColors.splice(i, 1);
        }
      }
    }else if(this.checked){
      //draw palette preview
      arrColors.push(this.parentNode.parentNode.childNodes[3].childNodes[3].textContent)
      for(var i=0; i< arrColors.length; i++){
        ctx.fillStyle = arrColors[i]
        ctx.fillRect((canvas.width*i)/arrColors.length, 0, canvas.width/arrColors.length, canvas.height)
      }
    } //closes if conditional
  }) //closes checkbox event listener
}) //closes checkbox forEach

//save palette into database
const btn = document.querySelector('#mkPalBtn')
btn.addEventListener('click', function(){
  //declare variables to hold values that will be saved into palettes collection db
  let palName = document.querySelector('#palName').value,
  desc = document.querySelector('#desc').value,
  chColors = document.querySelectorAll('.addColor:checked'),
  palUrl = canvas.toDataURL('image/png', 1.0),
  allColors = []
  //all checked colors are parsed to include the proper string info and then made into an object
  chColors.forEach(checked => {
    let elem = checked.parentNode.parentNode.childNodes[3];
    let pColor = new Color(elem.childNodes[1].textContent, elem.childNodes[3].textContent, elem.childNodes[5].textContent.replace('rgb', ''));
    allColors.push(pColor)
    console.log(allColors, palUrl, desc, palName)
  }) //closes forEach on NodeList colors
  //save into palettes database as a new palette for the user
  fetch('palette', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'title': palName,
      'desc': desc,
      'colors': allColors,
      'image': palUrl
    })
  })
  .then(response => {
    if (response.ok) return response.json()
  })
  .then(data =>{
  })
  window.location.href = '/palettegalry'
}) //closes event listener on create palette btn
