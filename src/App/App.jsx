import 'normalize.css';
import { useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { fetchInfo } from '../API/fetchImages';
import { Container } from './App.styled';
import Searchbar from '../Components/Searchbar';
import ImageGallery from '../Components/ImageGallery/ImageGallery';
import BtnLoadMore from '../Components/Button';
import Modal from '../Components/Modal/Modal';
import Loader from '../Components/Loader/Loader';

export default  function App() {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImg, setSelectedImg] = useState(null);
  const [reqStatus, setReqStatus] = useState('idle');

   window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
   });
  
  const handleSearchbarSubmit = (query) => {
    if (query.trim() === '') {
          return toast('PlEASE ENTER YOUR QUERY', {
            autoClose: 2000,
          });
    };
    
    if (query === inputValue) {
      return;
    }
    setPage(1);
    setImages([])
    setInputValue(query);
  }

  useEffect(() => {
    async function getImages() {
      if (inputValue === '') {
        return
      } else {
        try {
          setReqStatus('pending')
          const { hits } = await fetchInfo(1, inputValue);
          setImages(hits);
          setReqStatus('resolved');

          if (hits.length === 0) {
            return toast('THERE IS NO IMAGES ON QUERY. TRY AGAIN', {
              autoClose: 2000,
            });
          }

        } catch (error) {
          setReqStatus('rejected');
          console.log(error.message);
        }
      }
    }
    getImages();
    
  }, [inputValue]);
    
  useEffect(() => {
    async function getMoreImages() {
      if (page !== 1) {        
        try {
        setReqStatus('pending');
        const { hits } = await fetchInfo(page, inputValue);
        setReqStatus('resolved');
        setImages(prevHits => [...prevHits, ...hits])
      } catch (error) {
        this.setState({ reqStatus: 'rejected' });
        console.error(error.message);
      } }
      }
    getMoreImages()
  }, [inputValue, page]);

  const loadMore = e => {
      if (e.currentTarget === e.target) {
        setPage(prevState => prevState + 1)
      }
    };

 const toggleModal = () => {
    setSelectedImg(state => !state);
  };

  const onSelectedImg = selectedImg => {
    setSelectedImg(selectedImg);
  };

  const showBtnLoadMore = images.length >= 12;
  
    return (
      <>
        <Container>
          <Searchbar onSubmit={handleSearchbarSubmit} />
        </Container>
        {reqStatus === 'pending' && <Loader />}
        <ImageGallery data={images} onSelect={onSelectedImg} />
        {showBtnLoadMore && 
          <BtnLoadMore onClick={loadMore} />}
        <ToastContainer role="alert" />
        {selectedImg && (
          <Modal onClose={toggleModal}>
            <img src={selectedImg} alt="" />
          </Modal>
        )}
      </>
    );
}
