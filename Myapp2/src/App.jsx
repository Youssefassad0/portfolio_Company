// import React from 'react'
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import "./App.css";
import Projects from "./components/projects/Projects";
import Value from "./components/Values/Value";
function App() {
  return (
    <div className="App">
      <div>
        <div className="white-gradient"/>
          <Header />
          <Hero />
      </div>
      <Projects/>
      <Value/>
    </div>
  );
}

export default App;
