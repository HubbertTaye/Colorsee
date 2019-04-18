// ========================================================================= //
// ==== saves specific palette image when user clicks on "download" btn ===== //
// ========================================================================= //

//declare a variable to hold all the download icons in palettegalry.ejs
let dnlds = document.querySelectorAll('.fa-download')
let del = document.querySelectorAll('.fa-times-circle')

dnlds.forEach(dnld => {
  dnld.addEventListener('click', function(){
    let title = dnld.parentNode.parentNode.childNodes[1].innerText
    let imgUrl = this.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].src
    let link = document.createElement('a');
    //optimization: set the string to contain the palette's name
    link.download = `${title}.png`;
    link.href = imgUrl;
    link.click();
  })
})

Array.from(del).forEach(function(el){
  el.addEventListener('click', ()=>{
    //grab name, url put into variables
    let title = el.parentNode.parentNode.childNodes[1].innerText,
    url = el.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].src
    console.log(title, url)
    // send info to fetch with a delete method
    fetch('palette', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'title': title,
        'image': url
      })
    }) //closes delete fetch
    .then((response) =>{
      window.location.reload(true)
    })
  }) //closes event listener
}) //closes trash forEach
