import { Route, Routes } from "react-router";
import { Home } from "./pages";
import { Sign } from "./components";

function App() {
  return (
    <div id="container" className="p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign/:slug" element={<Sign />} />
        <Route path="/verify" element={<div>Verify</div>} />
      </Routes>
    </div>
  );
}

export default App;
