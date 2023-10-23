export default class SearchBtn {
  constructor(selector) {
    this.refs = this.getRefs(selector);
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.label');
    refs.spinner = refs.button.querySelector('.spinner');
    refs.searchIcon = refs.button.querySelector('.js-search__icon');

    return refs;
  }

  enable() {
    this.refs.button.disable = false;
    this.refs.label.textContent = 'Search';
    this.refs.spinner.classList.add('is-hidden');
    this.refs.searchIcon.classList.remove('is-hidden');
  }

  disable() {
    this.refs.button.disable = true;
    this.refs.label.textContent = 'Searching...';
    this.refs.spinner.classList.remove('is-hidden');
    this.refs.searchIcon.classList.add('is-hidden');
  }
}
