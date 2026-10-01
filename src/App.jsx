import { useState , useEffect} from 'react'
import './App.css'

import cacahuates from '../public/Img/cacahuates.jpg'
import jugo from '../public/Img/jugo.jpg'
import papas from '../public/Img/papas.jpg'
import pistaches from '../public/Img/pistaches.jpg'
import suabitel from '../public/Img/suabitel.jpg'
import suabitel2 from '../public/Img/suabitel2.jpg'

function Contador() {
  const [contador, setContador] = useState(0)
  return (
    <div>
      <p className='contaNum'>{contador}</p>
        <button onClick={() => setContador(contador + 1)} className="btn">
          Comprar
        </button>
    </div>
  )
}

function capitalizar(texto) {
  if (!texto){
    return ""
  } 
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

function Imagen({ src, alt }) {
  return (
    <div>
      <img src={src} alt={alt} className="card-img-top" />
    </div>
  )
}
function Galeria() {
  const fotos = [
    { src: cacahuates,   titulo: "Cacahuates" },
    { src: jugo, titulo: "Jugo" },
    { src: papas,     titulo: "Papas" },
    { src: pistaches,     titulo: "Pistaches" },
    { src: papas,     titulo: "Papas" },
    { src: suabitel,     titulo: "Suabitel Azul" },
    { src: suabitel2,     titulo: "Suabitel Amarillo" }
  ]
  return (
    <div className="container text-center">
      <div className="row align-items-start">
        {fotos.map((foto, i) => (
          
          <div className="col" key={i}>
            <br /><br />
            <div className="card" style={{ width: "22rem" }}>
              <Imagen src={foto.src} alt={foto.titulo} />
              <div className="card-body">
                <h5 className="card-title">{capitalizar(foto.titulo)}</h5> 
                <Contador/>
              </div>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function TemporizadorCarga({ alTerminar }) {
  const [segundos, setSegundos] = useState(3);

  useEffect(() => {
    async function iniciarConteo() {
      for (let i = 3; i > 0; i--) {
        setSegundos(i);
        await esperar(1000);
      }
      alTerminar();
    }

    iniciarConteo();
  }, [alTerminar]);

  return (
    <div className="text-center my-5">
      <div className="text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <h3 className="mt-3">Cargando catálogo en...</h3>
      <h1 className="display-1 fw-bold text-primary">{segundos}</h1>
    </div>
  );
}

function App() {
  const [cargando, setCargando] = useState(true);

  return (
    <div>
      <br />
      <div className="text-center">
        <h1>Tienda de Abarrotes</h1>
      </div>
      <br />
      {cargando ? (<TemporizadorCarga alTerminar={() => setCargando(false)} />) : (<Galeria />)}
    </div>
  )
}
export default App
