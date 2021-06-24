import { BrowserRouter, Route, Switch } from 'react-router-dom';


import { Home } from './pages/Home';
import {NewRoom}  from './pages/NewRoom';
import { Room } from './pages/Room';

import { AuthContextProvider } from './contexts/AuthContext';

//o createContext recebe oo formato da info que será armazenada
// dentro do contexto




function App() {
  

  return (
    <div>
    <BrowserRouter>
    {/* todo provider precisa receber uma prop value que é o valor do contexto */}
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>

    </BrowserRouter>

    </div>
  );
  }

export default App;
