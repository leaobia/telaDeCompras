import React, { useState, useEffect } from 'react';
import info from "./img/info.svg"
import search from "./img/search.svg"

function ProductList() {

  const [produtos, setProdutos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const produtosPorPagina = 1;
  const [images, setImages] = useState({});
  const [skus, setSkus] = useState({});
  const [image, setImage] = useState('');
  const [flexDirection, setflexDirection] = useState('column');
  const [categoryList, setCategoryList] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [coresList, setCoresList] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/v1/eCatalogos/produtos')
      .then(response => response.json())
      .then(data => {
        setProdutos(data.produtos);

        const categorias = data.produtos.reduce((acc, produto) => {
          const categoria = produto.category;
          if (!acc[categoria]) {
            acc[categoria] = 0;
          }
          acc[categoria] += 1;
          return acc;
        }, {});

        setCategoryList(categorias);
      });
  }, []);

  useEffect(() => {
    if (produtos.length > 0 && produtos[paginaAtual]) {
      const produtoAtual = produtos[paginaAtual];
      if (!images[produtoAtual.id] && !skus[produtoAtual.id]) {
        fetch(`http://localhost:3000/v1/eCatalogos/images/${produtoAtual.id}`)
          .then(response => response.json())
          .then(imageData => {
            setImage(imageData.images[0]?.path || '');
            setImages(prevImages => ({
              ...prevImages,
              [produtoAtual.id]: imageData.images
            }));

          });
        fetch(`http://localhost:3000/v1/eCatalogos/skus/${produtoAtual.id}`)
          .then(response => response.json())
          .then(skusData => {
            setSkus(prevSkus => ({
              ...prevSkus,
              [produtoAtual.id]: skusData.skus
            }));
          });
        fetch(`http://localhost:3000/v1/eCatalogos/colors/${produtoAtual.id}`)
          .then(response => response.json())
          .then(colorsData => {
            setCoresList({
              [produtoAtual.id]: colorsData.colors
            });
          });

      } else if (images[produtoAtual.id] && images[produtoAtual.id].length > 0) {
        setImage(images[produtoAtual.id][0]?.path || '');
      }
    }
  }, [paginaAtual, produtos, images, skus]);

  const proximaPagina = () => {
    if ((paginaAtual + 1) * produtosPorPagina >= produtos.length) {
      setPaginaAtual(0);
    } else {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaAtual === 0) {
      setPaginaAtual(Math.ceil(produtos.length / produtosPorPagina) - 1);
    } else {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const changeDirection = () => {
    setflexDirection(flexDirection === "column" ? "column-reverse" : "column");
  };

  const toggleModal = () => {
    console.log(coresList);
    setModalOpen(!modalOpen);
  };

  const toggleModal2 = () => {
    setModalOpen2(!modalOpen2);
  };

  const produtoAtual = produtos[paginaAtual];
  const categoriaAtual = produtoAtual ? produtoAtual.category : '';
  const quantidadeNaCategoria = categoryList[categoriaAtual] || 0;

  return (
    <div className='container'>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <header>
              Informações
              <span className="close" onClick={toggleModal}>&times;</span>
            </header>
            <p className='spanCores'>Cores</p>
            <div className="nomesCores">
              {coresList[produtoAtual.id] && coresList[produtoAtual.id][0] && (
                <p className = 'nomeCor'style = {{ backgroundColor: `#${coresList[produtoAtual.id][0].hex_code}` }}>
              {coresList[produtoAtual.id][0].name}
            </p>
  )}
          </div>


          <div className="modal-content__dados">
            <span>Nome do produto: {produtoAtual.name}</span>
            <span>Referencia: {produtoAtual.reference}</span>
            <span>Marca: {produtoAtual.brand}</span>
            <span>Categoria: {produtoAtual.category}</span>
            <span>Genero: {produtoAtual.gender}</span>
          </div>
        </div></div>
  )
}

{
  modalOpen2 && (
    <div className="modal"><div className="modal-content">
      <span className="close" onClick={toggleModal2}>&times;</span>
      <input type="text" placeholder='00.00.000' className='inputReferencia' />
    </div></div>
  )
}

<header className='container__header'>
  <div className="container__header--categoria">
    ({quantidadeNaCategoria}) {categoriaAtual}
  </div>
</header>
{
  produtoAtual && (
    <div className='container__produto'>
      {images[produtoAtual.id] && images[produtoAtual.id].length > 0 && (
        <div className='container__imagens'>
          <div className="container__imagem-grande" style={{ backgroundImage: `url(${image})` }}>
            <button className="container__botao container__botao--anterior" onClick={paginaAnterior}>
              &larr;
            </button>
            <button
              className="container__botao container__botao--proxima"
              onClick={proximaPagina}
            >
              &rarr;
            </button>
          </div>

          <div className="containerPesquisar">
            <img src={info} alt="btn informacoes" className='imgbtn' onClick={toggleModal} />
            <img src={search} alt="btn pesquisar" className='imgbtn' onClick={toggleModal2} />
            <div className='container__troca-imagem'>
              {images[produtoAtual.id].map((img, index) => (
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
      )}

      <div className="linhaPai">
        <div className="linha"></div>
      </div>
      <div className="container__dados">
        <button className="container__button" onClick={changeDirection}>&#8593;&#8595;</button>
        <span className="container__name">{produtoAtual.name.split(' ')[0].toLowerCase()}</span>
        <span className="container__reference"><span className='ref'>REF: </span>{produtoAtual.reference}</span>
        <span className="container__price">
          R$<span className="container__price-value">{produtoAtual.price}</span>
        </span>
      </div>

      <div className="container__pack" style={{ flexDirection: flexDirection }}>
        <div className="container__pack-display">
          {skus[produtoAtual.id] && skus[produtoAtual.id].map((sku, index) => (
            <div className="container__pack-item" key={index}>
              <span className="container__pack-size">{sku.size}</span>
              <span className="container__pack-stock">{sku.stock}</span>
            </div>
          ))}
          <span className='equal'>=</span>
          <div className="container__pack-item">
            <span>PACK</span>
            <span className="container__pack-stock">
              {skus[produtoAtual.id] && skus[produtoAtual.id].reduce((total, sku) => total + sku.stock, 0)}
            </span>
          </div>
        </div>

        <div className="container__pack-quantity-selector">
          <div className="quantity-selector">
            <span className="quantity-selector__label">Atual</span>
            <span className="quantity-selector__price">R$ 0,00</span>
          </div>

          <div className="quantity-selector__btns">
            <button className="quantity-selector__button">-</button>
            <div className="quantity-selector__quantity">0</div>
            <button className="quantity-selector__button">+</button>
          </div>
          <div className="quantity-selector">
            <span className="quantity-selector__label">Acumulado</span>
            <span className="quantity-selector__price">R$ 0,00</span>
          </div>
        </div>
      </div>
    </div>
  )
}
    </div >
  );
}

export default ProductList;