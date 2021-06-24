import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {auth, firebase} from './services/firebase'

import { Home } from './pages/Home';
import {NewRoom}  from './pages/NewRoom';
import { setupMaster } from 'cluster';

//o createContext recebe oo formato da info que será armazenada
// dentro do contexto
type AuthContextType = {
  user: User | undefined,
  signInWithGoogle: () => Promise<void>
}

type User = {
  id: string,
  name: string,
  avatar: string
}
export const AuthContext = createContext({} as AuthContextType);


function App() {
  const [user, setUser] = useState<User>();

  // primeiro parametro é qual funçãos e deseja executar. O segundo(sempre sera um array) é quando.
  // com o vetor vazio a funcao do primeiro parametro sera chamada apenas uma vez

  //essa funcao vai monitorar la no firebase se ja existia um login pre-feito pelo usuario.
  // se sim a funcao busca as info e preenche no estado da app
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        const {displayName, photoURL, uid} = user

        if(!displayName || !photoURL) throw new Error('Missing information from Google Account');

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

  }, [])
  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
  
    const result = await auth.signInWithPopup(provider);
    if(result.user){
      const {displayName, photoURL, uid} = result.user

      if(!displayName || !photoURL) throw new Error('Missing information from Google Account');

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  };
    

  return (
    <div>
    <BrowserRouter>
    {/* todo provider precisa receber uma prop value que é o valor do contexto */}
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>

    </div>
  );
  }

export default App;
