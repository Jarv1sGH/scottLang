import "./../Styles/Loader.css";
const Loader = () => {
  return (
    <div className="loaderContainer">
      <div className="typewriter">
        <div className="slide">
          <i></i>
        </div>
        <div className="paper"></div>
        <div className="keyboard"></div>
      </div>
      <div className="loadingText">
        <h2>Loading...</h2>
      </div>
    </div>
  );
};

export default Loader;
