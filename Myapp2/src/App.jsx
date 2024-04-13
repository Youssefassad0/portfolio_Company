// import React from 'react'
// import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import "./App.css";

import Projects from "./components/projects/Projects";
import Value from "./components/Values/Value";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
function App() {
  return (

    <>
    <div className="App">
      <div>
        <Header />
        <div className="white-gradient" />
        <Hero />
      </div>
    </div>
      <Projects />
      <Value />
      <Contact />
      <Footer />
    </>

  );
}

export default App;
