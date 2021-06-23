import illustrationImg from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import googleIconImage from '../assets/images/google-icon.svg';
import '../styles/auth.scss';

export function Home(){
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
                    <button className="create-room">
                        <img src={googleIconImage} alt="logo da google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form action="">
                        <input 
                        type="text" 
                        placeholder="digite o código da sala"
                        />
                        <button type="submit">
                             Entrar na sala
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}