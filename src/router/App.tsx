import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import HomePage from '../pages/Home';
import CalculatorPage from '../pages/Calculator';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/calculator' element={<CalculatorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
