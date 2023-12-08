import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import ViewTaskPg from './pages/ViewTaskPg';
import AddTaskPg from './pages/AddTaskPg';
import HomePg from './pages/HomePg';
function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePg/>} ></Route>
    <Route path='/view-task' element={<ViewTaskPg/>} ></Route>
    <Route path='/add-task' element={<AddTaskPg/>} ></Route>
   </Routes>
   </BrowserRouter>
   
   </>
  );
}

export default App;
