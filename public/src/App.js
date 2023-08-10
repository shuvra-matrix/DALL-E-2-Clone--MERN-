import Header from "./components/Layout/Header";
import InputSection from "./components/ImageGenrateSection/InputSection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Community from "./components/Community/Community";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<InputSection />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
