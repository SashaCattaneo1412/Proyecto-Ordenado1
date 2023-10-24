const CenteredContainer = ({ children }) => {
    return (
      <div className="centered-container">
        {children}
        <style jsx>{`
          .centered-container {
  
            width: 80%; /* Ancho deseado del contenedor */
            margin: 0 auto; /* Centrar horizontalmente en la pantalla */
            justify-content: center; /* Centrar horizontalmente */
            align-items: center; /* Centrar verticalmente */
            height: 450px; /* Altura deseada del contenedor */
            background: rgba(255, 255, 255, 0.30);
            backdrop-filter: blur(2px);
            padding: 10px; /* Espacio interior alrededor del contenido */
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Sombra ligera */
          }
  
          .inner-content {
            text-align: right; /* Alinear elementos a la derecha del contenedor */
          }
        `}</style>
      </div>
    );
  };
  
  export default CenteredContainer;