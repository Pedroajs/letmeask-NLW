import {createContext, ReactNode, useState, useEffect} from 'react';
import {auth, firebase} from '../services/firebase';

type AuthContextType = {
    user: User | undefined,
    signInWithGoogle: () => Promise<void>
  }
  
  type User = {
      id: string,
    name: string,
    avatar: string
}

type AuthContextProviderType = {
    children: ReactNode
}


export const AuthContext = createContext({} as AuthContextType);
export function AuthContextProvider(props: AuthContextProviderType){

    const [user, setUser] = useState<User>();

  // primeiro parametro é qual funçãos e deseja executar. O segundo(sempre sera um array) é quando.
  // com o vetor vazio a funcao do primeiro parametro sera chamada apenas uma vez

  //essa funcao vai monitorar la no firebase se ja existia um login pre-feito pelo usuario.
  // se sim a funcao busca as info e preenche no estado da app
  useEffect(()=>{
    // toda vez que declarar um eventListenet é uma boa pratica coloca=lo numa constante, e no final da
    // funcao retornar essa funcao ao final do metodo useEffect
    const unsubscribe = auth.onAuthStateChanged(user=>{
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

    return () =>{
      unsubscribe();
    }

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
    



    return(
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}