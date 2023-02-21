import { useState, useEffect } from "react";
import Navigation from "./components/common/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/home/Home";
import Footer from "./components/common/Footer";
import Parcel from "./components/parcel/Parcel";
import PageNotFound from "./components/PageNotFound";
import Contact from "./components/contact/Contact";
import Auth from "./components/auth/Auth";
import AuthWrapper from "./components/AuthWrapper";
import UpdateParcel from "./components/parcel/UpdateParcel";

function App() {
  const [isTopOfPage, setIsTopOfPage] = useState(true);

  const auth = useSelector((state) => state.authReducer.authUser);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      <Router>
        <Navigation isTopOfPage={isTopOfPage} auth={auth} />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route
            path="/parcels"
            element={auth ? <Parcel auth={auth} /> : <Auth />}
          /> */}
          <Route path="/parcels" element={<Parcel auth={auth} />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/parcels/:id" element={<UpdateParcel />} />
          <Route path="/sign" element={<Auth />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
