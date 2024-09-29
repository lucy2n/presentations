import { useState } from 'react';
import Presentation from '../presentation/presentation';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import React from 'react';

const App = () => {
  const [joinedUsers, setJoinedUsers] = useState([]);

  const addUser = (username) => {
    setJoinedUsers((prevUsers) => [...prevUsers, username]);
  };

  return (
      <Routes>
        <Route
          path="/"
          element={<MainPage addUser={addUser} />}
        />
        <Route
          path="/presentation/:id"
          element={<Presentation />}
        />
      </Routes>
  );
};

export default App;