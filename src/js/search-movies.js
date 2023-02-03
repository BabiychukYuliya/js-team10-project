import SearchMovieApi from './themoviedb-api-class';

searchForm = document.querySelector('#search-form');
galleryBox = document.querySelector('.gallery');

// const url = {
//   popular: `${BASE_URL}trending/movie/day?api_key=${KEY}`,
//   search: `${BASE_URL}search/movie?api_key=${KEY}&query=${this.searchQuary}&page=${this.page}&language=en-US&page=1&include_adult=false`,
//   info: `${BASE_URL}movie/${this.movieId}?api_key=${KEY}&language=en-US`,
// };

const searchMovieApi = new SearchMovieApi();

searchForm.addEventListener('submit', onSearch);

async function onSearch(evt) {
  evt.preventDefault();
  try {
    searchMovieApi.resetPage();
    searchMovieApi.quary = searchForm.searchQuery.value.trim();

    const { page, results, total_pages, total_results } =
      await searchMovieApi.themoviedbApi();
    // if (!searchMovieApi.quary) {
    //   resetMarkup();
    //   return;
    // }
    if (total_results === 0) {
      resetMarkup();
      console.log('Введите нормальный запрос!');
      return;
    }

    console.log('Results:', results);

    let filmNumber = 0;
    results.map(({ title, poster_path, genre_ids }) => {
      filmNumber += 1;
      console.log(filmNumber);
      console.log('Film name:', title);
      console.log('Img:', poster_path);
      console.log('Genre:', genre_ids);
    });

    // resetMarkup();
    // createImageMarkup(hits);
  } catch (error) {
    console.log(error.message);
  }
}

// function createImageMarkup(arr) {
//   const markup = arr
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
//         `
//     <div class="gallery__item">
//     <a class="gallery__link" href="${largeImageURL}">
//     <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
//     <div class="info">
//     <ul class="info-list list">
//       <li class="info__item">
//         <p><b>Likes</b></p>
//         <p>${likes}</p>
//       </li>
//       <li class="info__item">
//         <p><b>Views</b></p>
//         <p>${views}</p>
//       </li>
//       <li class="info__item">
//         <p><b>Comments</b></p>
//         <p>${comments}</p>
//       </li>
//       <li class="info__item">
//         <p><b>Downloads</b></p>
//         <p>${downloads}</p>
//       </li>
//     </ul>
//   </div>
//   </div>`
//     )
//     .join('');
//   galleryBox.insertAdjacentHTML('beforeend', markup);
// }
// function resetMarkup() {
//   galleryBox.innerHTML = '';
// }

function resetMarkup() {
  galleryBox.innerHTML = '';
}
