import React, { useState, useEffect } from 'react';
import ImagemPrincipal from './ImagemPrincipal';
import DadosProduto from './DadosProduto';
import PackDisplay from './PackDisplay';
import QuantidadeSelector from './QuantidadeSelector';

const ProdutoAtual = ({
  produtoAtual,
  images,
  skus,
  paginaAnterior,
  proximaPagina,
  toggleModal,
  toggleModal2,
  setImage,
  changeDirection,
  precoAtual,
  precoAcumulado,
  quantity,
  diminuirQuantidade,
  adicionaQuantidade,
  flexDirection 
}) => {
  if (!produtoAtual) return null;

  const imagens = images[produtoAtual.id] || [];
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (imagens.length > 0) {
      setCurrentImage(imagens[0].path);
    }
  }, [produtoAtual, imagens]);

  const handleImageChange = (newImage) => {
    console.log('Imagem selecionada:', newImage);
    setCurrentImage(newImage); 
    setImage(newImage); 
  };

  return (
    <div className='container__produto'>
      {imagens.length > 0 && (
        <ImagemPrincipal
          image={currentImage}
          paginaAnterior={paginaAnterior}
          proximaPagina={proximaPagina}
          toggleModal={toggleModal}
          toggleModal2={toggleModal2}
          imagens={imagens}
          setImage={handleImageChange} 
        />
      )}

      <div className="linhaPai">
        <div className="linha"></div>
      </div>

      <DadosProduto
        name={produtoAtual.name}
        reference={produtoAtual.reference}
        price={produtoAtual.price}
        changeDirection={changeDirection}
      />

      <div className="container__pack" style={{ flexDirection: flexDirection }}>
        <PackDisplay skus={skus[produtoAtual.id] || []} />
        <QuantidadeSelector
          precoAtual={precoAtual}
          precoAcumulado={precoAcumulado}
          quantity={quantity}
          diminuirQuantidade={diminuirQuantidade}
          adicionaQuantidade={adicionaQuantidade}
        />
      </div>
    </div>
  );
};

export default ProdutoAtual;

