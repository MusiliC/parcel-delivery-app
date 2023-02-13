import { useState, useEffect } from "react";
import Navigation from "./components/common/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/common/Footer";
import Parcel from "./components/parcel/Parcel";
import PageNotFound from "./components/PageNotFound";
import Contact from "./components/contact/Contact";
import Auth from "./components/auth/Auth";

function App() {
  const [isTopOfPage, setIsTopOfPage] = useState(true);

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
        <Navigation isTopOfPage={isTopOfPage} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parcels" element={<Parcel />} />
          <Route path="*" element={<PageNotFound/>} />
          <Route path="/contact" element = {<Contact/>} />
          <Route path="/sign" element={<Auth/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
