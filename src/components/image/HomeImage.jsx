import defaultHomeImage from "../../assets/images/home-main-photo-example.jpg";

const HomeImage = ({ src }) => {
    const handleError = (e) => {
        e.target.onError = null;
        e.target.src = defaultHomeImage;
    };

    return <img src={src} alt="Home" onError={handleError} />;
};

export default HomeImage;
