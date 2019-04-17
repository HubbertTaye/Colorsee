//declare a variable to hold all the download icons in palettegalry.ejs
let dnlds = document.querySelectorAll('.fa-download')

dnlds.forEach(dnld => {
  dnld.addEventListener('click', function(){
    let imgUrl = this.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].src
    let link = document.createElement('a');
    //optimization: set the string to contain the palette's name
    link.download = "my-palette.png";
    link.href = imgUrl;
    link.click();
  })
})
