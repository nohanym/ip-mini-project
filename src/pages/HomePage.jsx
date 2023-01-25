import { Link } from "react-router-dom";
import backgroundImage from "../assets/background.webp";

const HomePage = () => {
  return (
    <div className="homepage-wrapper">
      <div className="home-container">
        <div className="home-cta">
          <h1>Bookly Book Store</h1>
          <p>
            {/* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero,
            error earum quia, unde exercitationem ratione cum eaque laudantium
            ipsum mollitia sed tempore dignissimos! Tempora, nihil repudiandae */}
            Buy your favorite books today at Bookly Online Book Store! Browse an
            amazing selection of genres to find the perfect read, save with
            exclusive discounts and experience convenient delivery options. Shop
            our wide range now to get the reading material you love - don't wait
            any longer!
          </p>
          <Link to="/books">Explore </Link>
        </div>
        <div className="home-background">
          <img src={backgroundImage} alt="background" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
