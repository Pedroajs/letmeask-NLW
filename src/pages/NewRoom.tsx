import { Link } from 'react-router-dom';
import { useContext } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { AuthContext } from '../App';


export function NewRoom(){
    const {user } = useContext(AuthContext);

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>

                
                <div className="main-content">
                    <img src={logo} alt="Logo da letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <h1>{user?.name}</h1>
                    <form action="">
                        <input 
                        type="text" 
                        placeholder="digite o código da sala"
                        />
                        <Button type="submit">
                             Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique qui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}