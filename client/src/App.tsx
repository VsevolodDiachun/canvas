import React from 'react';
import { RouterProvider } from 'react-router-dom';
import {useAppRouter} from "./routes/AppRouter";


function App() {
    const router = useAppRouter()
    return (
      <RouterProvider router={router} />
  );
}

export default App;