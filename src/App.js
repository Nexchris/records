import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './asset/Header' // FINI
import Background from './Pages/Background' // FINI // FINI
import Collection from './Pages/CollectionScreen' // FINI
import Category from './Pages/CategoryScreen' //FINI
import VinyleForm from './Pages/VinyleForm'// FINI
import User from './Pages/UserScreen' //FINI



function App() {
  return (
    <div className="App">
      <Header />
      <Background />
       <Router> {/* Encadrez votre application avec le composant Router */}
          <Routes> {/* Encadrez vos routes avec le composant Routes */}
          <Route path="/background" element={<Background />} /> {/* Route vers Offer */}
            <Route exact path="/" element={<Collection />} /> {/* Route par défaut vers Home */}
            <Route exact path="/category" element={<Category />} /> {/* Route par défaut vers Home */}
            <Route path="/add" element={<VinyleForm />} /> {/* Route vers Offer */}
            <Route path="/User" element={<User />} /> {/* Route vers Offer */}
          </Routes>
      </Router>
   </div>
  );
}

export default App;
