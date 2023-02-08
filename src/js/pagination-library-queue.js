import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import { toQueue } from './add-to-queue';
import { renderCard } from './lib';

const queueData = toQueue.getQueueAll();

export function getPageFilms(queueData, itemsPerPage, currentPage) {
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;

  return toQueue.getQueueAll().slice(start, end);
}

export function createLibraryPaginationQueue(items, renderFn, totalItems) {
  const container = document.querySelector('#pagination');
  const cardSetLibrary = document.querySelector('.library-section__card-set');
  if (!queueData) {
    return (cardSetLibrary.innerHTML = '🐷🐷🐷🐷');
  }
  const itemsPerPage = 10;
  const options = {
    totalItems: totalItems || queueData.length,
    itemsPerPage,
    visiblePages: 5,
    centerAlign: false,
  };

  const pagination = new Pagination(container, options);

  pagination.on('beforeMove', event => {
    renderCard(getPageFilms(items, itemsPerPage, event.page - 1));
  });

  pagination.movePageTo(0);
}