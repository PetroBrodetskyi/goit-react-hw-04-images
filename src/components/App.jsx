import React, { useState, useEffect } from 'react';
import { fetchImages } from './servises/api';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { animateScroll } from 'react-scroll';
import Modal from './Modal/Modal';
import { Notify } from 'notiflix';


const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      if (!searchQuery) {
        setIsLoading(false);
        return;
      }

      try {
        const { hits, totalHits } = await fetchImages(searchQuery, page);

        if (hits.length === 0) {
          Notify.failure('Зображення не знайдено. Спробуйте інший запит.', {
            position: 'center-bottom',
            timeout: 5000,
            width: '290px',
            fontSize: '18px'
          });
          setIsLoading(false);
          return;
        }

        setImages((prevImages) => [...prevImages, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / per_page));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page, per_page]);

  const formSubmit = (newSearchQuery) => {
    const trimmedQuery = newSearchQuery.trim();

    if (trimmedQuery && trimmedQuery !== searchQuery) {
      setSearchQuery(trimmedQuery);
      setImages([]);
      setPage(1);
      setLoadMore(false);
      setIsModalOpen(false);
    }
  };

  const onloadMore = () => {
    setPage((prevPage) => prevPage + 1);
    scrollOnMoreButton();
  };

  const scrollOnMoreButton = () => {
    animateScroll.scrollMore(1000, { delay: 10, smooth: 'linear' });
  };

  const openModal = (newLargeImageURL) => {
    if (!isModalOpen) {
      setLargeImageURL(newLargeImageURL);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {!isModalOpen && <Searchbar onSubmit={formSubmit} />}

      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {error && <p>❗something went wrong❗</p>}

      {loadMore && !isLoading && <Button onloadMore={onloadMore} page={page} />}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          largeImageURL={largeImageURL}
        />
      )}
    </>
  );
};

export default App;