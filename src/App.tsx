import { BrowserRouter, Route } from 'react-router-dom';


import { Home } from './pages/Home';
import {NewRoom}  from './pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext';

//o createContext recebe oo formato da info que será armazenada
// dentro do contexto




function App() {
  

  return (
    <div>
    <BrowserRouter>
    {/* todo provider precisa receber uma prop value que é o valor do contexto */}
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>

    </BrowserRouter>

    </div>
  );
  }

export default App;
