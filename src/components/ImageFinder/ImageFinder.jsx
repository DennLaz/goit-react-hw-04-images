// import { Component } from 'react';
import { useState, useEffect } from 'react';

import Searchbar from './Searchbar';
import { getImages } from '../../shared/services/getApi';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from 'shared/Modal';
import Loader from './Loader';
import styles from './imageFinder.module.css';

export default function ImageFinder() {
  const [state, setState] = useState({
    items: [],
    loader: false,
    error: null,
  });

  const [pageQuery, setPageQuery] = useState({
    query: '',
    page: 1,
    totalPage: 0,
  });

  const [modal, setModal] = useState({
    modalImg: {
      src: '',
      alt: '',
    },
    modalOpen: false,
  });

  const { items, loader, error } = state;
  const { query, page, totalPage } = pageQuery;
  const { modalOpen, modalImg } = modal;

  useEffect(() => {
    async function getImgItems() {
      setState(prevState => ({ ...prevState, error: false, loader: true }));
      try {
        const data = await getImages(query, page);
        const totalPage = Math.ceil(data.totalHits / 12);
        setState(
          prevState => {
            return {
              ...prevState,
              items: [...prevState.items, ...data.hits],
            };
          },
          setPageQuery(prevPageQuery => {
            return { ...prevPageQuery, totalPage };
          })
        );
      } catch (error) {
        setState(prevState => ({ ...prevState, error}));
      }
    }
    getImgItems();
  }, [query, page]);

  function saveQuery(value) {
    if (value !== query) {
      setPageQuery({ query: value, page: 1, totalPage: 0 });
      setState(prevState => ({ ...prevState, items: [] }));
    }
  }

  function loadMoreClick() {
    setPageQuery(prevState => {
      const { page: prevPage } = prevState;
      return { ...prevState, page: prevPage + 1 };
    });
  }

  function openModal(indx) {
    const { src: currentSrc } = modalImg;
    const { largeImageURL: src, tags: alt } = items[indx];
    if (currentSrc !== src) {
      setModal({
        modalImg: {
          alt,
          src,
        },
        modalOpen: true,
      });
    }
  }

  function closeModal() {
    setModal({
      modalImg: {
        src: '',
        alt: '',
      },
      modalOpen: false,
    });
  }

  const notFound = !totalPage && query && !loader && !error;
  const noWrapper = error || loader || notFound;
  const noGallary = !notFound && query && !error;
  const noButton = totalPage - page > 0;

  return (
    <div className={styles.imageFinder}>
      <Searchbar onSubmit={saveQuery} />
      {noGallary && <ImageGallery items={items} onClick={openModal} />}
      {noButton && !loader && <Button onClick={loadMoreClick} />}
      {modalOpen && (
        <Modal onClose={closeModal}>
          <img src={modalImg.src} alt={modalImg.alt} />
        </Modal>
      )}
      {noWrapper && (
        <div className={styles.wrapper}>
          {loader && <Loader />}
          {error && <p className={styles.error}>{error?.message}</p>}
          {notFound && (
            <p
              className={styles.notFind}
            >{`On request "${query}" nothing found`}</p>
          )}
        </div>
      )}
    </div>
  );
}

// class OldImageFinder extends Component {
//   // state = {
//   //   items: [],
//   //   query: '',
//   //   page: 1,
//   //   totalPage: 0,
//   //   modalImg: {
//   //     src: '',
//   //     alt: '',
//   //   },
//   //   modalOpen: false,
//   //   loader: false,
//   //   error: null,
//   // };

//   // componentDidUpdate(prevProps, prevState) {
//   //   const { page: prevPage, query: prevQuery } = prevState;
//   //   const { page: nextPage, query: nextQuery } = this.state;
//   //   if (prevPage !== nextPage || prevQuery !== nextQuery) {
//   //     this.getImgItems();
//   //   }
//   // }

//   // async getImgItems() {
//   //   const { query, page } = this.state;
//   //   this.setState({ loader: true });
//   //   try {
//   //     const data = await getImages(query, page);
//   //     const totalPage = Math.ceil(data.totalHits / 12);
//   //     this.setState(prevState => {
//   //       const { items } = prevState;

//   //       return { items: [...items, ...data.hits], totalPage, loader: false };
//   //     });
//   //   } catch (error) {
//   //     this.setState({ error, loader: false });
//   //   }
//   // }

//   // saveQuery = value => {
//   //   const { query } = this.state;
//   //   if (value !== query) {
//   //     this.setState({ query: value, page: 1, totalPage: 0, items: [] });
//   //   }
//   // };

//   // loadMoreClick = () => {
//   //   this.setState(prevState => {
//   //     const { page: prevPage } = prevState;
//   //     return { page: prevPage + 1 };
//   //   });
//   // };

//   // openModal = indx => {
//   //   const { items, modalImg } = this.state;
//   //   const { src: currentSrc } = modalImg;
//   //   const { largeImageURL: src, tags: alt } = items[indx];
//   //   if (currentSrc !== src) {
//   //     this.setState({
//   //       modalImg: {
//   //         alt,
//   //         src,
//   //       },
//   //       modalOpen: true,
//   //     });
//   //   }
//   // };

//   // closeModal = () => {
//   //   this.setState({
//   //     modalImg: {
//   //       src: '',
//   //       alt: '',
//   //     },
//   //     modalOpen: false,
//   //   });
//   // };

//   // render() {
//   // const { saveQuery, loadMoreClick, openModal, closeModal } = this;
//   // const {
//   //   items,
//   //   modalImg,
//   //   modalOpen,
//   //   totalPage,
//   //   page,
//   //   loader,
//   //   query,
//   //   error,
//   // } = this.state;

//   // const notFound = !totalPage && query && !loader && !error;
//   // const noWrapper = error || loader || notFound;
//   // const noGallary = !notFound && query && !error;
//   // const noButton = totalPage - page > 0;

//   // return (
//   //   <div className={styles.imageFinder}>
//   //     <Searchbar onSubmit={saveQuery} />
//   //     {noGallary && <ImageGallery items={items} onClick={openModal} />}
//   //     {noButton && !loader && <Button onClick={loadMoreClick} />}
//   //     {modalOpen && (
//   //       <Modal onClose={closeModal}>
//   //         <img src={modalImg.src} alt={modalImg.alt} />
//   //       </Modal>
//   //     )}
//   //     {noWrapper && (
//   //       <div className={styles.wrapper}>
//   //         {loader && <Loader />}
//   //         {error && <p className={styles.error}>{error?.message}</p>}
//   //         {notFound && <p className={styles.notFind}>{`On request "${query}" nothing found`}</p>}
//   //       </div>
//   //     )}
//   //   </div>
//   // );
//   // }
// }
