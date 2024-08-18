import React, { useState, useEffect } from 'react';
import './css/Estoque.css'
import './css/Header.css'
import './css/ProductList.css'
import Header from './Header'
import ProdutoAtual from './ProdutoAtual';

function ProductList() {

  const [produtos, setProdutos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const produtosPorPagina = 1;
  const [images, setImages] = useState({});
  const [skus, setSkus] = useState({});
  const [flexDirection, setflexDirection] = useState('column');
  const [categoryList, setCategoryList] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [coresList, setCoresList] = useState({});
  const [inputReferencia, setInputReferencia] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [precoAtual, setPrecoAtual] = useState(0);
  const [precoAcumulado, setPrecoAcumulado] = useState(0);
  const [image, setImage] = useState('');
  const [currentImage, setCurrentImage] = useState('');

  const saveQuantityToLocalStorage = (produtoId, quantidade) => {
    localStorage.setItem(`quantidade-${produtoId}`, quantidade);
  };

  const loadQuantityFromLocalStorage = (produtoId) => {
    const quantidade = localStorage.getItem(`quantidade-${produtoId}`);
    return quantidade ? parseInt(quantidade, 10) : 0;
  };

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

      const quantidadeSalva = loadQuantityFromLocalStorage(produtoAtual.id);
      setQuantity(quantidadeSalva);
      let containerpacktotal = parseFloat(document.querySelector('.container-pack-total').textContent) || 1;
      const precoProdutoAtual = produtoAtual.price * quantidadeSalva * containerpacktotal;
      setPrecoAtual(precoProdutoAtual);

    }
  }, [paginaAtual, produtos, images, skus]);


  const proximaPagina = () => {
    if ((paginaAtual + 1) * produtosPorPagina >= produtos.length) {
      setPaginaAtual(0);
    } else {
      setPaginaAtual(paginaAtual + 1);
    }
    setQuantity(loadQuantityFromLocalStorage(produtos[paginaAtual].id));
  };

  const paginaAnterior = () => {
    if (paginaAtual === 0) {
      setPaginaAtual(Math.ceil(produtos.length / produtosPorPagina) - 1);
    } else {
      setPaginaAtual(paginaAtual - 1);
    }
    setQuantity(loadQuantityFromLocalStorage(produtos[paginaAtual].id));
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

  const savePrecoAcumuladoToLocalStorage = (precoAcumulado) => {
    localStorage.setItem('precoAcumulado', precoAcumulado);
  };

  const loadPrecoAcumuladoFromLocalStorage = () => {
    const precoAcumulado = localStorage.getItem('precoAcumulado');
    return precoAcumulado ? parseFloat(precoAcumulado) : 0;
  };

  useEffect(() => {
    const precoAcumuladoSalvo = loadPrecoAcumuladoFromLocalStorage();
    setPrecoAcumulado(precoAcumuladoSalvo);
  }, []);

  const adicionaQuantidade = () => {
    const produtoAtual = produtos[paginaAtual];
    let containerpacktotal = parseFloat(document.querySelector('.container-pack-total').textContent) || 1;
    if (produtoAtual) {

      const novaQuantidade = quantity + 1;

      const precoAtualAntigo = produtoAtual.price * quantity * containerpacktotal;
      const novoPrecoAtual = produtoAtual.price * novaQuantidade * containerpacktotal;

      setQuantity(novaQuantidade);
      setPrecoAtual(novoPrecoAtual);

      const novoPrecoAcumulado = precoAcumulado - precoAtualAntigo + novoPrecoAtual;
      setPrecoAcumulado(novoPrecoAcumulado);
      savePrecoAcumuladoToLocalStorage(novoPrecoAcumulado);

      saveQuantityToLocalStorage(produtoAtual.id, novaQuantidade);
    }
  };

  const diminuirQuantidade = () => {
    if (quantity > 0) {
      const produtoAtual = produtos[paginaAtual];
      let containerpacktotal = parseFloat(document.querySelector('.container-pack-total').textContent) || 1;
      if (produtoAtual) {

        const novaQuantidade = quantity - 1;


        const precoAtualAntigo = produtoAtual.price * quantity * containerpacktotal;
        const novoPrecoAtual = produtoAtual.price * novaQuantidade * containerpacktotal;

        setQuantity(novaQuantidade);
        setPrecoAtual(novoPrecoAtual);


        const novoPrecoAcumulado = precoAcumulado - precoAtualAntigo + novoPrecoAtual;
        setPrecoAcumulado(novoPrecoAcumulado);
        savePrecoAcumuladoToLocalStorage(novoPrecoAcumulado);

        saveQuantityToLocalStorage(produtoAtual.id, novaQuantidade);
      }
    }
  };




  const buscarProdutoPorReferencia = (referencia) => {
    fetch(`http://localhost:3000/v1/eCatalogos/produtos/${referencia}`)
      .then(response => response.json())
      .then(data => {
        const produtoEncontrado = produtos.find(produto => produto.reference === referencia);
        if (produtoEncontrado) {
          setPaginaAtual(produtos.indexOf(produtoEncontrado));
        }
      });
  };

  const handleBlur = () => {
    buscarProdutoPorReferencia(inputReferencia);
    toggleModal2()
  };

  const produtoAtual = produtos[paginaAtual];
  var categoriaAtual = produtoAtual ? produtoAtual.category : '';
  const quantidadeNaCategoria = categoryList[categoriaAtual] || 0;


  const buscarProdutoPorCategoria = (categoria) => {
    fetch(`http://localhost:3000/v1/eCatalogos/produtos/categoria/${categoria}`)
      .then(response => response.json())
      .then(data => {
        if (data.produtos && data.produtos.length > 0) {
          const primeiroProduto = data.produtos[0];
          const index = produtos.findIndex(produto => produto.id === primeiroProduto.id);

          if (index !== -1) {
            setPaginaAtual(index);
          }
        } else {
          console.log('Nenhum produto encontrado para a categoria:', categoria);
          setPaginaAtual(0);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar produtos por categoria:', error);
      });
  };



  const nextCategory = () => {
    const categorias = Object.keys(categoryList);
    const indexAtual = categorias.indexOf(categoriaAtual);

    if (indexAtual !== -1) {
      const novoIndice = (indexAtual + 1) % categorias.length;
      const proximaCategoria = categorias[novoIndice];

      categoriaAtual = proximaCategoria;
      buscarProdutoPorCategoria(proximaCategoria);
    }
  };

  const backCategory = () => {
    const categorias = Object.keys(categoryList);
    const indexAtual = categorias.indexOf(categoriaAtual);

    if (indexAtual !== -1) {

      const novoIndice = (indexAtual - 1 + categorias.length) % categorias.length;
      const categoriaAnterior = categorias[novoIndice];

      categoriaAtual = categoriaAnterior;
      buscarProdutoPorCategoria(categoriaAnterior);
    }
  };
  const handleImageChange = (newImage) => {
    console.log('Imagem selecionada:', newImage);
    setCurrentImage(newImage); // Atualiza o estado local da imagem
    setImage(newImage); // Atualiza a imagem principal
  };

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
                <p className='nomeCor' style={{ backgroundColor: `#${coresList[produtoAtual.id][0].hex_code}` }}>
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
            <header>
              BUSCAR POR REF
              <span className="close" onClick={toggleModal2}>&times;</span>
            </header>
            <input
              type="text"
              placeholder='00.00.000'
              className='inputReferencia'
              value={inputReferencia}
              onChange={(e) => setInputReferencia(e.target.value)}
              onBlur={handleBlur}
            />
          </div></div>
        )
      }
  <Header
        categoriaAtual={categoriaAtual}
        quantidadeNaCategoria={quantidadeNaCategoria}
        backCategory={backCategory}
        nextCategory={nextCategory}
      />
      {produtoAtual && (
        <ProdutoAtual
          produtoAtual={produtoAtual}
          images={images}
          skus={skus}
          paginaAnterior={paginaAnterior}
          proximaPagina={proximaPagina}
          toggleModal={toggleModal}
          toggleModal2={toggleModal2}
          setImage={handleImageChange}
          changeDirection={changeDirection}
          precoAtual={precoAtual}
          precoAcumulado={precoAcumulado}
          quantity={quantity}
          diminuirQuantidade={diminuirQuantidade}
          adicionaQuantidade={adicionaQuantidade}
          flexDirection={flexDirection}
        />
      )}
    </div>
  );
};

export default ProductList;