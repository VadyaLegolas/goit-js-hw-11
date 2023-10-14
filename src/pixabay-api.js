import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39645635-7da43b24dbf787654135e35eb';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export default class PhotosApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  async fetchPhotos() {
    const params = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: this.perPage,
    });
    const url = `${BASE_URL}?${params}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    this.incrementPage();
    return await res.json();
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
