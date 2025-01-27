const Home = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Contenedor de la imagen */}
        <div className="relative group">
          {/* Imagen principal */}
          <img
            src="/img/face-1.png"
            alt="Mac Miller"
            className="w-65 h-100 object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          {/* Imagen que aparece al hacer hover */}
          <img
            src="/img/face-2.png"
            alt="Mac Miller Hover"
            className="w-130 h-100 object-cover rounded-full absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
        {/* Texto debajo */}
        <h1 className="mt-6 text-4xl font-bold">
          MAC MILLER
        </h1>
      </div>
    );
  };
  

export default Home;
