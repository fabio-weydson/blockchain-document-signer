import { Route, Routes } from "react-router";
import { Home } from "./pages";
import { Sign } from "./components";

function App() {
  return (
    <div id="container" className="p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/documents/sign" element={<Sign />} />
        <Route path="/documents/verify" element={<div>Verify</div>} />
      </Routes>
    </div>
  );
}

export default App;
