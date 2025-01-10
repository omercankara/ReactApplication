import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // Store dosyasını içe aktar
import Home from './Modules/Home/Home';
import Shopping from './Modules/Cart/Shoping'; // Shopping sayfasını import et
import Login from './Modules/Auth/Login';
import Register from './Modules/Auth/Register';
import Order from "./Modules/Order/Order";
import DefaultLayout from './layouts/DefaultLayout';
import ProtectedRoute from './middleware/middleware'; // ProtectedRoute'yi import et

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shopping"
              element={
                <ProtectedRoute>
                  <Shopping /> {/* Shopping sayfası da ProtectedRoute ile korundu */}
                </ProtectedRoute>
              }
            />

            <Route
              path="/order"
              element={
                <ProtectedRoute>
                  <Order /> {/* Shopping sayfası da ProtectedRoute ile korundu */}
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
