import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchGallery, perPage } from './fetchGallery';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const target = document.querySelector('.js-guard');

let currentPage = 1;
let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

form.addEventListener('submit', onFormSubmit);
let lightbox = new SimpleLightbox('.gallery a');

function onFormSubmit(evt) {
  evt.preventDefault();
  gallery.innerHTML = '';

  const { searchQuery } = evt.currentTarget.elements;

  let observer = new IntersectionObserver(onLoad, options);
  function onLoad(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        currentPage += 1;
        fetchGallery(searchQuery.value, currentPage)
          .then(data => {
            gallery.insertAdjacentHTML('beforeend', createMarkup(data));
            lightbox.refresh();
            if (currentPage === Math.round(data.totalHits / perPage)) {
              observer.unobserve(target);
            }
          })
          .catch(err => console.log(err));
      }
    });
  }

  fetchGallery(searchQuery.value)
    .then(data => {
      if (data.hits.length) {
        Notify.info(`Hooray! We found ${data.totalHits} images.`);
      } else {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      gallery.insertAdjacentHTML('beforeend', createMarkup(data));
      if (data.totalHits > perPage) {
        observer.observe(target);
      }
      lightbox.refresh();
    })
    .catch(err => console.log(err));
}

// async function fetchGallery(search, page = 1) {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const KEY_API = '35783392-ced7b2b0963a7e7ac45fdf9cc';

//   const resp = await axios.get(
//     `${BASE_URL}?key=${KEY_API}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
//   );

//   return await resp.data;

function createMarkup(obj) {
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
        <a class="gallery__link" href="${largeImageURL}">
            <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width = 350/>
            <div class="info">
              <p class="info-item">
                <b>Likes: </b> <br> ${likes}
              </p>
              <p class="info-item">
                <b>Views: </b><br>${views}
              </p>
              <p class="info-item">
                <b>Comments: </b><br>${comments}
              </p>
              <p class="info-item">
                <b>Downloads: </b><br>${downloads}
              </p>
            </div>
            </a>
          </div>`
    )
    .join('');
}

// ------------------------------------------------------------------------------------------------------------------------------------

// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import axios from 'axios';

// const form = document.querySelector('#search-form');
// const gallery = document.querySelector('.gallery');
// const target = document.querySelector('.js-guard');

// const perPage = 40;
// let currentPage = 1;
// let options = {
//   root: null,
//   rootMargin: '300px',
//   threshold: 1.0,
// };

// form.addEventListener('submit', onFormSubmit);

// function onFormSubmit(evt) {
//   evt.preventDefault();
//   gallery.innerHTML = '';

//   const { searchQuery } = evt.currentTarget.elements;
//   let lightbox = new SimpleLightbox('.gallery a');
//   let observer = new IntersectionObserver(onLoad, options);

//   fetchGallery(searchQuery.value)
//     .then(data => {
//       if (data.hits.length) {
//         Notify.info(`Hooray! We found ${data.totalHits} images.`);
//       } else {
//         Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//       }
//       gallery.insertAdjacentHTML('beforeend', createMarkup(data));
//       observer.observe(target);
//     })
//     .catch(err => console.log(err));

//   function onLoad(entries, observer) {
//     entries.forEach(async entry => {
//       console.log(entry.isIntersecting);
//       if (entry.isIntersecting) {
//         currentPage += 1;

//         const addGallery = await fetchGallery(searchQuery.value, currentPage);
//         try {
//           gallery.insertAdjacentHTML('beforeend', createMarkup(data));

//           if (currentPage === Math.round(data.totalHits / perPage)) {
//             observer.unobserve(target);
//           }
//         } catch (err) {
//           console.log(err);
//         }
//       }
//     });
//   }
// }

// async function fetchGallery(search, page = 1) {
//   const BASE_URL = 'https://pixabay.com/api';
//   const KEY_API = '35783392-ced7b2b0963a7e7ac45fdf9cc';

//   const resp = await axios.get(
//     `${BASE_URL}?key=${KEY_API}&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
//   );

//   return await resp.data;

// function createMarkup(obj) {
//   return obj.hits
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) =>
//         `<div class="photo-card">
//         <a class="gallery__link" href="${largeImageURL}">
//             <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" width = 350/>
//             <div class="info">
//               <p class="info-item">
//                 <b>Likes: </b> <br> ${likes}
//               </p>
//               <p class="info-item">
//                 <b>Views: </b><br>${views}
//               </p>
//               <p class="info-item">
//                 <b>Comments: </b><br>${comments}
//               </p>
//               <p class="info-item">
//                 <b>Downloads: </b><br>${downloads}
//               </p>
//             </div>
//             </a>
//           </div>`
//     )
//     .join('');
// }
