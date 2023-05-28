import { useEffect, useState } from 'react';
import getSearchedImgApi from '../services/imgApi';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import css from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQueryVal] = useState('');
  const [page, setPage] = useState(1);
  const [imgSrc, setImgSrc] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setQuery = query => {
    setQueryVal(query);
    setPage(1);
    setImages([]);
  };

  const pageLoad = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
  const getSearched = async () => {
    setIsLoading(true);
    try {
      const res = await getSearchedImgApi(query, page);
      setImages(prev => [...prev, ...res.hits]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (query !== '' || page !== 1) {
    getSearched();
  }
  }, [query, page]);
  
  const modalOpen = largeImageURL => {
    setIsOpenModal(true);
    setImgSrc(largeImageURL);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setImgSrc('');
  };

  return (
    <div className={css.app}>
      <Searchbar setQuery={setQuery} query={query} />
      <ImageGallery images={images} modalOpen={modalOpen} />
      {isLoading && <Loader />}
      {images.length >= 12 && <Button onClick={pageLoad} />}
      {isOpenModal && <Modal imgSrc={imgSrc} closeModal={closeModal} />}
    </div>
  );
};

export default App;
