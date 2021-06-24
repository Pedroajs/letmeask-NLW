import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../styles/room.scss';


export function Room() {
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="letmeask" />
                    <div>codigo da sala</div>
                </div>
            </header>
            <main className="main-content">
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>5 perguntas</span>
                </div>
                <form >
                    <textarea 
                        placeholder="O que você quer perguntar?"
                    />

                    <div className="form-footer">
                        <span>
                            Para enviar uma pergunta, <button>faça seu login</button>
                        </span>
                        <Button type="submit" children="Enviar pergunta" />
                    </div>
                </form>
            </main>
        </div>
    );
}