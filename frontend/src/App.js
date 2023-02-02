import {
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';
import '@coreui/coreui/dist/css/coreui.min.css';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
