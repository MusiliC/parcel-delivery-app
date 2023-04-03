import { useState, useEffect } from "react";
import Navigation from "./components/common/Navigation";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./components/common/public/Home";
import Parcel from "./features/parcel/Parcel";
import PageNotFound from "./components/PageNotFound";
import Contact from "./components/contact/Contact";
import Auth from "./features/auth/Auth";
import AuthWrapper from "./components/AuthWrapper";
import UpdateParcel from "./features/parcel/UpdateParcel";
import Layout from "./components/common/Layout";
import DashLayout from "./components/common/ParcelLayout";

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
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Navigation isTopOfPage={isTopOfPage} auth={auth} /> */}

        {/* public routes */}

        <Route index element={<Auth />} />

        {/* protected routes */}

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Home />} />

          {/* parcels routes */}

          <Route path="parcels">
            <Route index element={<Parcel auth={auth} />} />
            <Route path=":id" element={<UpdateParcel />} />
          </Route>

          {/* users */}

          <Route path="users">
            <Route index element="users" />
          </Route>

          {/* contact page */}

          <Route path="contact">
            <Route index element={<Contact />} />
          </Route>
        </Route>
        {/* end of dash */}
      </Route>
      <Route path="*" element={<PageNotFound />} />
      {/* end of public routes */}
    </Routes>
  );
}

export default App;
