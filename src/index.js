//Замість кнопки «Load more», можна зробити нескінченне завантаження зображень під час прокручування сторінки. Ми надаємо тобі повну свободу дій в реалізації, можеш використовувати будь-які бібліотеки.

import PhotosApiService from './pixabay-api';

import getRefs from './get-refs';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SearchBtn from './search-btn';

const refs = getRefs();
const photosApiService = new PhotosApiService();
const searchBtn = new SearchBtn('.js-search-btn');

refs.form.addEventListener('submit', onFormSubmit);
refs.more.addEventListener('click', onLoadMore);

function onFormSubmit(e) {
  e.preventDefault();

  photosApiService.query = e.currentTarget.elements.searchQuery.value;
  if (photosApiService.query === '') {
    return Notify.warning(`Nothing to search!!!`);
  }
  searchBtn.disable();
  photosApiService.resetPage();
  photosApiService
    .fetchPhotos()
    .then(data => {
      clearMarkup();
      if (data.totalHits === 0) {
        throw new Error();
      }
      Notify.info(`Hooray! We found ${data.totalHits} images.`);
      appendPhotosMarkup(data);
      searchBtn.enable();
    })
    .catch(() => {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}

function onLoadMore() {
  photosApiService
    .fetchPhotos()
    .then(data => {
      const totalObj = photosApiService.perPage * (photosApiService.page - 2);

      if (totalObj > data.totalHits) {
        throw new Error();
      }

      appendPhotosMarkup(data);
    })
    .catch(err => {
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    });
}

function appendPhotosMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data));
}

function createMarkup(data) {
  return data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" width="300px" height="200px" loading="lazy" />
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
  </div>`
    )
    .join('');
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}
// var lightbox = new SimpleLightbox('.gallery a', { /* options */ });

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
