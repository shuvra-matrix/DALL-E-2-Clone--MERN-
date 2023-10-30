import Header from "./components/Layout/Header";
import InputSection from "./components/ImageGenrateSection/InputSection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Community from "./components/Community/Community";
import { Fragment } from "react";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" Component={InputSection} />
        <Route exact path="/community" Component={Community} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
