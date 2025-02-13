import { Link , useNavigate} from "react-router-dom";
import { useRef } from "react";
import api from '../services/api'

function Register() {

    const name = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();



    async function handleSubmit(event){
        event.preventDefault();

        try{
            if(name.current.value === '' || email.current.value === '' || password.current.value === ''){
                alert('Todos os campos são obrigatórios.')
                return
            }

            const response = await api.post('/register', {
                name: name.current.value,
                email: email.current.value,
                password: password.current.value,
            })

            console.log(response.data.message)

            navigate('/')


        }catch(e){
            if(e.status === 400){
                alert(e.response.data.message)
            } else {
                alert('Ocorreu um erro ao registrar, tente novamente.')
            }
        }


    }

    return(

        <div>
            <h1>Registre-se</h1>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder="Nome" ref={name}/>
                <input type="email" placeholder="Email" ref={email}/>
                <input type="password" placeholder="Senha"  ref={password}/>
                <button>Cadastrar</button>
            </form>
            <Link to={'/'}> Já tem uma conta? Log In</Link>
        </div>

        


    )


}

export default Register;