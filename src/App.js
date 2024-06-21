import logo from './logo.svg';
import './App.css';
import Collection from './Pages/CollectionScreen'
import VinyleForm from './Pages/VinyleForm'
import Test from './Pages/test'
import Animation from './Pages/Animation'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './asset/Header'


function App() {
  return (
    <div className="App">
      <Header />
       <Router> {/* Encadrez votre application avec le composant Router */}
          <Routes> {/* Encadrez vos routes avec le composant Routes */}
            <Route exact path="/" element={<Collection />} /> {/* Route par défaut vers Home */}
            <Route path="/form" element={<VinyleForm />} /> {/* Route vers Offer */}
            <Route path="/animation" element={<Animation />} /> {/* Route vers Offer */}
            <Route path="/test" element={<Test />} /> {/* Route vers Offer */}
          </Routes>
      </Router>
   </div>
  );
}

export default App;
