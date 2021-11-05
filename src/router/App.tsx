import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';
import Calculator from '../pages/Calculator';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/calculator' element={<Calculator />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
