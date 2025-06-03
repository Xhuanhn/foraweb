"use client"

import { useState } from "react"
import "./ProductDetail.css"

const ProductDetail = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0) 

  const productImages = [product.image, product.image2 || "/placeholder.svg"]

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla")
      return
    }
    setAddedToCart(true)
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  return (
    <div className="product-detail">
      <button className="back-button" onClick={onClose}>
        ← Volver
      </button>

      <div className="product-detail-content">
        <div className="product-images">
          <div className="main-image">
            <img src={productImages[currentImageIndex] || "/placeholder.svg"} alt={product.name} />
          </div>
          <div className="thumbnail-images">
            {productImages.map((image, index) => (
              <img
                key={index}
                src={image || "/placeholder.svg"}
                alt={`${product.name} - Vista ${index + 1}`}
                className={currentImageIndex === index ? "active" : ""}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">{product.price}</p>
          <p className="product-description">{product.description}</p>

          <div className="product-colors">
            <h3>COLOR: {selectedColor}</h3>
            <div className="color-options">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`color-option ${selectedColor === color ? "active" : ""}`}
                  style={{ backgroundColor: getColorCode(color) }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Color ${color}`}
                >
                  {selectedColor === color && <span className="check-mark">✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="product-sizes">
            <div className="size-header">
              <h3>SELECCIONA LA TALLA</h3>
              <button className="size-guide-button" onClick={() => setShowSizeGuide(!showSizeGuide)}>
                GUÍA DE TALLAS
              </button>
            </div>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-option ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {showSizeGuide && (
              <div className="size-guide">
                <h4>Guía de Tallas</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Talla</th>
                      <th>Pecho (cm)</th>
                      <th>Cintura (cm)</th>
                      <th>Cadera (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>XS</td>
                      <td>86-90</td>
                      <td>70-74</td>
                      <td>90-94</td>
                    </tr>
                    <tr>
                      <td>S</td>
                      <td>90-94</td>
                      <td>74-78</td>
                      <td>94-98</td>
                    </tr>
                    <tr>
                      <td>M</td>
                      <td>94-98</td>
                      <td>78-82</td>
                      <td>98-102</td>
                    </tr>
                    <tr>
                      <td>L</td>
                      <td>98-104</td>
                      <td>82-88</td>
                      <td>102-108</td>
                    </tr>
                    <tr>
                      <td>XL</td>
                      <td>104-110</td>
                      <td>88-94</td>
                      <td>108-114</td>
                    </tr>
                    <tr>
                      <td>XXL</td>
                      <td>110-116</td>
                      <td>94-100</td>
                      <td>114-120</td>
                    </tr>
                  </tbody>
                </table>
                <button className="close-guide-button" onClick={() => setShowSizeGuide(false)}>
                  Cerrar
                </button>
              </div>
            )}
          </div>

          <div className="product-actions">
            <button className={`add-to-cart-button ${addedToCart ? "added" : ""}`} onClick={handleAddToCart}>
              {addedToCart ? "¡AGREGADO!" : "AGREGAR"}
            </button>
          </div>

          <div className="product-availability">
            <p>
              Disponibilidad en tienda: <span className="availability-status">Consultar en tienda</span>
            </p>
          </div>

          <div className="product-details-extra">
            <div className="detail-item">
              <h4>Detalles</h4>
              <p>Composición: 100% Algodón</p>
              <p>Lavado: Lavar a máquina max 30°C</p>
              <p>Referencia: 1234567890</p>
            </div>
            <div className="detail-item">
              <h4>Envío y devoluciones</h4>
              <p>Envío estándar: 3-5 días hábiles</p>
              <p>Devoluciones: 30 días para cambios y devoluciones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Función para convertir nombres de colores a códigos hexadecimales
function getColorCode(colorName) {
  const colorMap = {
    Negro: "#000000",
    Blanco: "#FFFFFF",
    Rojo: "#FF0000",
    Azul: "#0000FF",
    Gris: "#808080",
    Café: "#8B4513",
  }

  return colorMap[colorName] || "#CCCCCC"
}

export default ProductDetail
