import logo from './logo.svg';
import './App.css';
import { useLocation } from 'react-router-dom';
import { Quiz } from './components/Quiz/Quiz';
import {
  Route,
  Routes,
  Navigate,
  Outlet
} from 'react-router-dom';
function App() {
 return (
<Routes>
  <Route path='/*' element={<Navigate replace to="/Quiz"/>}/>
  <Route path='/Quiz' element={<Quiz/>} />
</Routes>
 )
}

export default App;
