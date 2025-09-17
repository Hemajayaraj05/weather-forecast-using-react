import Footer from "../components/Footer";
import Header from "../components/Header";
import MainPage from "../components/MainPage";

function Weather() {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Header />
      </div>

      <div className="flex-grow">
        <MainPage />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default Weather;
