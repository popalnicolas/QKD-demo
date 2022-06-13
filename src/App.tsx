import { Route, Routes } from 'react-router-dom';
import AppBarComponent from './components/AppBar.component';
import EvePage from './pages/Eve.page';
import NoEvePage from './pages/NoEve.page';

function App() {

  return (
    <>
    <AppBarComponent />
      <Routes>
        <Route path={process.env.PUBLIC_URL + '/eve'} element={<EvePage />} />
        <Route path='*' element={<NoEvePage />} />
      </Routes>
    </>
  );
}

export default App;
