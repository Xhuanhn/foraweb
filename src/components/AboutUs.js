"use client"

import { useState, useEffect } from "react"
import "./AboutUs.css"
import aboutus1 from "../assets/aboutus1.jpg"
import aboutus2 from "../assets/aboutus2.jpg"


const AboutUs = ({ onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const carouselImages = [
    aboutus1,
    aboutus2,
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
        setIsTransitioning(false)
      }, 300) 
    }, 3000)

    return () => clearInterval(interval)
  }, [carouselImages.length])

  return (
    <div className="about-us-overlay">
      <div className="about-us-modal">
        <div className="about-us-header">
          <h2 className="about-us-title">ACERCA DE FORAJIDOS CULTURE</h2>
          <button className="about-us-close" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>
        <div className="about-us-content">
          <div className="about-us-section">
            <p className="about-us-text">
              <strong>ForajidosCulture</strong> nace de la pasión por la cultura urbana y la expresión personal a través
              de la moda. Somos una marca mexicana que celebra la rebeldía, la autenticidad y el estilo único de cada
              individuo. Desde nuestros inicios, hemos creado diseños que reflejan la esencia de los forajidos modernos:
              aquellos que se atreven a ser diferentes, que rompen esquemas y que viven la vida sin límites.
            </p>
          </div>
          <div className="carousel-container">
            <div className="carousel-wrapper">
              <div className="carousel-images">
                <img
                  src={carouselImages[currentImageIndex] || "/placeholder.svg"}
                  alt={`Imagen ${currentImageIndex + 1}`}
                  className={`carousel-image ${isTransitioning ? "fade-out" : "fade-in"}`}
                />
              </div>
            </div>
          </div>
          <div className="about-us-section">
            <p className="about-us-text">
              Nuestras colecciones están inspiradas en la cultura de los autos, las motocicletas, las celebridades y los
              drops exclusivos que marcan tendencia. Cada prenda cuenta una historia, cada diseño tiene un propósito:
              empoderar a quienes las portan para que expresen su verdadera personalidad. En ForajidosCulture, no solo
              vendemos ropa, creamos una comunidad de personas auténticas que comparten la misma filosofía de vida.
              <br />
              <br />
              <em>Únete a la revolución. Sé un forajido.</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
