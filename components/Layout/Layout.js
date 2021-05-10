import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

function Layout({ children }) {
  return (
    <section>
      <NavBar />
      {children}
      <Footer />
    </section>
  );
}

export default Layout;
