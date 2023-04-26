const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener("submit", onFormSubmit);


function onFormSubmit(evt) {
    evt.preventDefault();

    const { searchQuery } = evt.currentTarget.elements;
fetchGallery(searchQuery.value).then(data=> gallery.innerHTML = renderMarkup(data)).catch(err=> console.log(err))
}

function fetchGallery(search) {
    const BASE_URL = 'https://pixabay.com/api';
    const KEY_API = '35783392-ced7b2b0963a7e7ac45fdf9cc';
    
    return fetch(
      `${BASE_URL}?key=${KEY_API}&q=${search}&image_type="photo"&orientation="horizontal"&safesearch="true"&page=1&per_page=40`
    ).then(resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    });
}

function renderMarkup(obj) {

    return obj.hits
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) =>
          `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width = 400 />
            <div class="info">
              <p class="info-item">
                <b>Likes: </b>${likes}
              </p>
              <p class="info-item">
                <b>Views: </b>${views}
              </p>
              <p class="info-item">
                <b>Comments: </b>${comments}
              </p>
              <p class="info-item">
                <b>Downloads: </b>${downloads}
              </p>
            </div>
          </div>`
      )
      .join('');
}