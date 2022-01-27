const KEY = 'dd8321b31a183d9113294047dec8ce39';
const btn = document.querySelector('button');

btn.addEventListener( 'click', function(event){
    const input = document.querySelector('input');
    clearImages();
    clearErrorText();

    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${input.value}&sort=relevance&format=json&nojsoncallback=1&per_page=1&page=1`;
  
    fetch(url).then(
        function(response){
            if(response.status>=200 && response.status<300){
                return response.json();
            }
            else{
                showErrorText();
                return;
            }
        }
    ).then(
        function(data){
            getImageUrl(data.photos.photo[0]);
        }
    ).catch(
        function(error){
            showErrorText();
        }
    );
});


function getImageUrl(photoObject){
    let photo = photoObject;
    let size = 'm';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;
    displayImg(imgUrl);
}

function displayImg(url){
    let img = document.createElement('img');
    img.src = url;

    document.body.appendChild(img);
}

function clearImages(){
    const images = document.querySelectorAll('img');

    for(const img of images){
        img.remove();
    }
}

function showErrorText(){
    let errorText = document.createElement('p');
    errorText.innerHTML = 'Something went wrong, no photos found';
    document.body.appendChild(errorText);
}


function clearErrorText(){
    const text = document.querySelectorAll('p');
 
    for(const t of text){
        t.remove();
    }
}