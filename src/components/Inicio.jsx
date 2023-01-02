import React from "react";
import Card from "../common/Card";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

function Inicio({ products }) {
  return (
    <div className="inicio_container">
      {/* Comienzo carrusel */}
      <div className="contentItemCarrusel">
        <div className="itemCarrusel" id="itemCarrusel-1">
          <div className="imagenCarrusel" id="imagenCarrusel-1">
            <img
              src="https://st3.depositphotos.com/1194063/18551/i/600/depositphotos_185516050-stock-photo-delicious-pizza-with-ingredients-and.jpg"
              alt="item1"
            ></img>
          </div>
          <div className="flechasCarrusel">
            <a href="#itemCarrusel-3">
              <i>
                <BsFillArrowLeftCircleFill />
              </i>
            </a>
            <a href="#itemCarrusel-2">
              <i>
                <BsFillArrowRightCircleFill />
              </i>
            </a>
          </div>
        </div>
        <div className="itemCarrusel" id="itemCarrusel-2">
          <div className="imagenCarrusel" id="imagenCarrusel-2">
            <img
              src="https://st4.depositphotos.com/1001092/21510/i/600/depositphotos_215102654-stock-photo-homemade-beef-ciabatta-hamburgers-wooden.jpg"
              alt="item2"
            ></img>
          </div>
          <div className="flechasCarrusel">
            <a href="#itemCarrusel-1">
              <i>
                <BsFillArrowLeftCircleFill />
              </i>
            </a>
            <a href="#itemCarrusel-3">
              <i>
                <BsFillArrowRightCircleFill />
              </i>
            </a>
          </div>
        </div>
        <div className="itemCarrusel" id="itemCarrusel-3">
          <div className="imagenCarrusel" id="imagenCarrusel-3">
            <img
              src="https://st3.depositphotos.com/1585301/12977/i/600/depositphotos_129778798-stock-photo-ready-pasta-on-wood.jpg"
              alt="item3"
            ></img>
          </div>
          <div className="flechasCarrusel">
            <a href="#itemCarrusel-2">
              <i>
                <BsFillArrowLeftCircleFill />
              </i>
            </a>
            <a href="#itemCarrusel-1">
              <i>
                <BsFillArrowRightCircleFill />
              </i>
            </a>
          </div>
        </div>
      </div>
      {/* Comienzo cards */}
      <h2 className="titulo-populares">Productos mas Populares</h2>
      {
        <Card
          productos={products.filter((producto) => producto.puntaje >= 3)}
        />
      }
    </div>
  );
}

export default Inicio;
