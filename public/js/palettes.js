class Color{
  constructor(alias, hex, rgb){
    this.alias = alias;
    this.hex = hex;
    this.rgb = rgb;
  }
}

const btn = document.querySelector('button')
btn.addEventListener('click', function(){
  let arrColors = [],
  palName = document.querySelector('#palName').value,
  desc = document.querySelector('#desc').value,
  colors = document.querySelectorAll('.addColor:checked');

  colors.forEach(el => {
    let elem = el.parentNode.parentNode.childNodes[3];
    let pColor = new Color(elem.childNodes[1].textContent, elem.childNodes[3].textContent, elem.childNodes[5].textContent.replace('rgb', ''));
    //mandatory: create an image rendering of colors picked
    //optimization: display colors made into a palette rendering
    arrColors.push(pColor)
  }) //closes forEach on NodeList colors
    //save into palettes database as a new palette for the user
    fetch('palette', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'title': palName,
        'desc': desc,
        'colors': arrColors
        //mandatory: add image url here for the palette made
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data =>{
      window.location.reload(true)
    })
}) //closes event listener on create palette btn
