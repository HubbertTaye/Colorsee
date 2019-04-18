let del = document.querySelectorAll('.fa-times-circle')

Array.from(del).forEach(function(el){
  el.addEventListener('click', ()=>{
    //grab name, url put into variables
    let alias = el.parentNode.parentNode.childNodes[3].childNodes[1].innerText,
    hex = el.parentNode.parentNode.childNodes[3].childNodes[3].innerText,
    rgb = el.parentNode.parentNode.childNodes[3].childNodes[5].innerText
    // send info to fetch with a delete method
    fetch('colors', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'alias': alias,
        'hex': hex,
        'rgb': rgb
      })
    }) //closes delete fetch
    .then((response) =>{
      window.location.reload(true)
    })
  }) //closes event listener
}) //closes trash forEach
