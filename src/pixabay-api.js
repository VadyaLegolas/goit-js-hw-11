import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  '39645635-7da43b24dbf787654135e35eb';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39645635-7da43b24dbf787654135e35eb';


export default class PhotosApiService {
  constructor() {
    this.searchQuery = '';
  }

  get query(){
    return this.searchQuery;
  }

  set query(newQuery){
    this.searchQuery = newQuery;
  }

  fetchPhotos() {
    const params = new URLSearchParams({
        key: API_KEY,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      });
      const url = `${BASE_URL}?${params}`;

      return fetch(url).then(res => res.json).then(console.log())
  }
}
