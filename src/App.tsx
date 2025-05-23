import { Routes, Route } from 'react-router-dom';

import NotFound from './components/NotFound';
import Login from './features/Authentication/pages/Login';
import Signup from './features/Authentication/pages/Signup';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
