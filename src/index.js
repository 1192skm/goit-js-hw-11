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
      return resp.json;
    });
}

function renderMarkup(obj) {
    console.log(obj.hits);
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
          }) => (
            `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes ${likes}</b>
              </p>
              <p class="info-item">
                <b>Views ${views}</b>
              </p>
              <p class="info-item">
                <b>Comments ${comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads ${downloads}</b>
              </p>
            </div>
          </div>`
        )
      )
      .join('');
}