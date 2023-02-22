import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import HomePage from "./HomePage";


function App() {
  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

