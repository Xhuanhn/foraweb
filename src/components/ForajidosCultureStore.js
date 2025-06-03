"use client"

import { useState, useEffect } from "react"
import "./ForajidosCultureStore.css"
import camiseta1 from "../assets/Carro1.png"
import carro3back from "../assets/Carro3back.png"
import carro3front from "../assets/Carro3front.png"
import famoso1back from "../assets/famoso1back.png"
import famoso1front from "../assets/famosofront.png"
import famoso2back from "../assets/famoso2back.png"
import moto1back from "../assets/moto1back.png"
import motofront from "../assets/motofront.png"
import moto2back from "../assets/moto2back.png"
import drop1front from "../assets/drop1front.png"
import drop1back from "../assets/drop1back.png"
import logo from "../assets/ForajidosLogo.png"
import ProductDetail from "./ProductDetail"
import instagramLogo from "../assets/logoinsta.png"
import AboutUs from "./AboutUs"

const productData = {
  Carros: [
    {
      id: 1,
      name: "Dodge Challenger",
      image: carro3back,
      image2: carro3front,
      price: "399MX",
      isNew: false,
      colors: ["Negro", "Blanco", "Gris"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      description: "Camiseta de algodón corte Oversize con estampado del iconico coche moderno DODGE CHALLENGER.",
    },
    {
      id: 6,
      name: "Hoonigan 43ver",
      image: camiseta1,
      image2: camiseta1,
      price: "399MX",
      isNew: true,
      colors: ["Negro", "Café"],
      sizes: ["S", "M", "L", "XL"],
      description: "Camiseta de algodón corte Oversize con estampado de Hoonigan.",
    },
  ],
  Bikers: [
    {
      id: 7,
      name: "Motocross Husquarna",
      image: moto1back,
      image2: motofront,
      price: "399MX",
      isNew: true,
      colors: ["Negro", "Gris"],
      sizes: ["S", "M", "L", "XL"],
      description: "Camiseta de algodón corte Oversize con estampado de Motocross Husquarna.",
    },
    {
      id: 8,
      name: "Biker Life Yamaha",
      image: moto2back,
      image2: motofront,
      price: "399MX",
      colors: ["Negro", "Café"],
      sizes: ["S", "M", "L", "XL"],
      description: "Camiseta de algodón corte Oversize con estampado de Biker Life Yamaha.",
    },
  ],
  Celebrities: [
    {
      id: 13,
      name: "Eminem Hits",
      image: famoso1back,
      image2: famoso1front,
      price: "399MX",
      isNew: true,
      colors: ["Negro", "Blanco"],
      sizes: ["S", "M", "L"],
      description: "Camiseta de algodón corte Oversize con estampado de Eminem. Edición especial con sus mejores hits.",
    },
    {
      id: 14,
      name: "TTC Hits",
      image: famoso2back,
      image2: famoso1front,
      price: "399MX",
      colors: ["Negro", "Gris"],
      sizes: ["S", "M", "L", "XL"],
      description: "Camiseta de algodón corte Oversize con estampado de Tyler The Creator. Edición especial con sus mejores hits.",
    },
  ],
  DROPS: [
    {
      id: 19,
      name: "Carpem Diem",
      image: drop1back,
      image2: drop1front,
      price: "399MX",
      isNew: false,
      colors: ["Negro"],
      sizes: ["S", "M", "L", "XL"],
      description: "Camiseta de algodón corte Oversize con estampado de Carpem Diem. Edición limitada.",
    },
  ],
}

const ForajidosCultureStore = () => {
  const [activeCategory, setActiveCategory] = useState("ALL")
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showAboutUs, setShowAboutUs] = useState(false)

  const categories = ["ALL", ...Object.keys(productData)]

  const getAllProducts = () => {
    return Object.values(productData).flat()
  }

  const getCurrentProducts = () => {
    if (activeCategory === "ALL") {
      return getAllProducts()
    }
    return productData[activeCategory] || []
  }

  const getSearchResults = () => {
    if (!searchQuery.trim()) return []

    const allProducts = getAllProducts()
    return allProducts.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const handleCategoryChange = (category) => {
    if (category === activeCategory) return

    setTimeout(() => {
      setActiveCategory(category)
      setSidebarVisible(false)
    }, 300)
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setSearchVisible(false)
  }

  const handleCloseProductDetail = () => {
    setSelectedProduct(null)
  }

  const handleSearchResultClick = (product) => {
    setSelectedProduct(product)
    setSearchVisible(false)
    setSearchQuery("")
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/forajidosculture/", "_blank")
  }

  const handleAboutUsClick = () => {
    setShowAboutUs(true)
    setSidebarVisible(false)
  }

  const handleCloseAboutUs = () => {
    setShowAboutUs(false)
  }

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  useEffect(() => {
    if (sidebarVisible || searchVisible || showAboutUs) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [sidebarVisible, searchVisible, showAboutUs])

  return (
    <div className="store-container">
      <header className="store-header">
        <div className="header-content">
          <button
            className="toggle-button"
            onClick={() => setSidebarVisible(!sidebarVisible)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
          <div className="logo-container" onClick={() => setSelectedProduct(null)} style={{ cursor: "pointer" }}>
            <img src={logo || "/placeholder.svg"} alt="ForajidosCulture" className="logo-header" />
          </div>
          <nav className="header-nav">
            {categories.map((category) => (
              <button
                key={category}
                className={`nav-button ${activeCategory === category ? "active" : ""}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </nav>
          <button
            className="search-button"
            onClick={() => setSearchVisible(!searchVisible)}
            aria-label="Buscar productos"
          >
            🔍︎
          </button>
        </div>
      </header>

      {sidebarVisible && <div className="sidebar-overlay" onClick={() => setSidebarVisible(false)} />}

      {searchVisible && <div className="search-overlay" onClick={() => setSearchVisible(false)} />}

      <aside className={`sidebar-modal ${sidebarVisible ? "visible" : ""}`}>
        <div className="sidebar-header">
          <button className="close-button" onClick={() => setSidebarVisible(false)} aria-label="Cerrar menú">
            ✕
          </button>
        </div>

        <div className="sidebar-content">
          <div className="main-categories">
            {categories.map((category) => (
              <button
                key={category}
                className={`main-category-button ${activeCategory === category ? "active" : ""}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="sidebar-section">
            <h3 className="section-title">EN PLENO CRECIMIENTO</h3>
            <button className="category-item" onClick={handleAboutUsClick}>
              ACERCA DE FORAJIDOS CULTURE 𖤐
            </button>
          </div>
          <div className="sidebar-section">
            <h3 className="section-title">NOVEDADES</h3>
            <p className="section-subtitle">TEMPORADA 2025</p>
          </div>
        </div>
      </aside>
      <aside className={`search-sidebar ${searchVisible ? "visible" : ""}`}>
        <div className="search-sidebar-header">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              autoFocus
            />
            {searchQuery && (
              <button className="clear-search-button" onClick={clearSearch}>
                BORRAR
              </button>
            )}
          </div>
          <button className="close-search-button" onClick={() => setSearchVisible(false)} aria-label="Cerrar búsqueda">
            ✕
          </button>
        </div>
        <div className="search-results">
          {searchQuery && (
            <>
              {getSearchResults().length > 0 ? (
                <ul className="search-results-list">
                  {getSearchResults().map((product) => (
                    <li key={product.id}>
                      <button className="search-result-item" onClick={() => handleSearchResultClick(product)}>
                        <span className="result-name">{product.name}</span>
                        <span className="result-price">{product.price}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="no-results">
                  <p>No se encontraron productos para "{searchQuery}"</p>
                </div>
              )}
            </>
          )}
        </div>
      </aside>
      <div className="store-body">
        <main className="store-main">
          {selectedProduct ? (
            <ProductDetail product={selectedProduct} onClose={handleCloseProductDetail} />
          ) : (
            <div className="product-grid">
              {getCurrentProducts().map((product) => (
                <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
                  {product.isNew && <span className="new-tag">Nuevo</span>}
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  <p>{product.name}</p>
                  <p className="product-price">{product.price}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      <footer className="store-footer">
        <div className="footer-content">
          <div className="footer-columns">
            <div className="footer-column">
              <h3 className="footer-title">Colecciones</h3>
              <ul className="footer-links">
                <li>
                  <button className="footer-link">CARROS</button>
                </li>
                <li>
                  <button className="footer-link">BIKERS</button>
                </li>
                <li>
                  <button className="footer-link">CELEBRITIES</button>
                </li>
                <li>
                  <button className="footer-link">DROPS</button>
                </li>
                <li>
                  <button className="footer-link">ACCESORIOS</button>
                </li>
                <li>
                  <button className="footer-link">GORRAS</button>
                </li>
                <li>
                  <button className="footer-link">SUDADERAS</button>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Información Corporativa</h3>
              <ul className="footer-links">
                <li>
                  <button className="footer-link" onClick={handleAboutUsClick}>
                    ACERCA DE FORAJIDOS CULTURE
                  </button>
                </li>
                <li>
                  <button className="footer-link">SOSTENIBILIDAD</button>
                </li>
                <li>
                  <button className="footer-link">POLITICA EMPRESARIAL</button>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-title">Ayuda</h3>
              <ul className="footer-links">
                <li>
                  <button className="footer-link">ATENCIÓN AL CLIENTE</button>
                </li>
                <li>
                  <button className="footer-link">MI CUENTA</button>
                </li>
                <li>
                  <button className="footer-link">NUESTRAS TIENDAS</button>
                </li>
                <li>
                  <button className="footer-link">TÉRMINOS Y CONDICIONES</button>
                </li>
                <li>
                  <button className="footer-link">CONTACTO</button>
                </li>
                <li>
                  <button className="footer-link">AVISO DE COOKIES</button>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-social">
              <button className="instagram-button" onClick={handleInstagramClick} aria-label="Síguenos en Instagram">
                <img src={instagramLogo} alt="Instagram" className="instagram-icon" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal About Us */}
      {showAboutUs && <AboutUs onClose={handleCloseAboutUs} />}
    </div>
  )
}

export default ForajidosCultureStore
