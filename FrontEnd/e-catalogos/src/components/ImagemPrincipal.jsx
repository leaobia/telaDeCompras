import React from 'react';
import infoImage from './img/info.svg'; 
import search from './img/search.svg';
import back from './img/arrowback.svg';
import go from './img/arrowgo.svg';

const ImagemPrincipal = ({ image, paginaAnterior, proximaPagina, toggleModal, toggleModal2, imagens, setImage }) => {
  return (
    <div className='container__imagens'>
      <div className="container__imagem-grande" style={{ backgroundImage: `url(${image})` }}>
        <button className="container__botao container__botao--anterior" onClick={paginaAnterior}>
          <img src={back} alt="produto anterior" />
        </button>
        <button className="container__botao container__botao--proxima" onClick={proximaPagina}>
          <img src={go} alt="próximo produto" />
        </button>
      </div>

      <div className="containerPesquisar">
        <img src={infoImage} alt="btn informacoes" className='imgbtn' onClick={toggleModal} />
        <img src={search} alt="btn pesquisar" className='imgbtn' onClick={toggleModal2} />
        <div className='container__troca-imagem'>
          {imagens.map((img, index) => (
            <button
              key={index}
              className="container__thumbnail"
              onClick={() => setImage(img.path)} 
            >
              <img
                src={img.path}
                alt={`Thumbnail ${index + 1}`}
                className="container__thumbnail-img"
                style={{ width: 50, height: 50 }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagemPrincipal;