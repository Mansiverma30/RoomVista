import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Example from "./components/Example";
import Example1 from "./components/Example1";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/example" element={<Example />} />
        <Route path="/example1" element={<Example1 />} />
      </Routes>
    </Router>
  );
}

export default App;
