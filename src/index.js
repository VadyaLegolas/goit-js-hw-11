import PhotosApiService from './pixabay-api';

import getRefs from './get-refs';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

const refs = getRefs();
const photosApiService = new PhotosApiService();

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  photosApiService.query = e.currentTarget.elements.searchQuery.value;
  photosApiService.resetPage();
  photosApiService.fetchPhotos().then(data => {
    refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data))
  }).catch(console.log);
}

function createMarkup(data){
    return data.hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes: ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${downloads}</b>
      </p>
    </div>
  </div>`).join('');

}


function clearMarkup(){
    refs.gallery.innerHTML = ''
}
// var lightbox = new SimpleLightbox('.gallery a', { /* options */ });

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });


