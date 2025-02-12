import { useRef} from "react";
import api from '../services/api.js'
import { useNavigate, Link } from "react-router-dom";


function Login() {

    const email = useRef()
    const password = useRef()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        try{

            if(email.current.value === '' || password.current.value === ''){
                alert('Preencha todos os campos')
                return
            }


            const response = await api.post('/login', {
                email : email.current.value,
                password : password.current.value,
            })

            localStorage.setItem('token', response.data.token)

            alert(response.data.message)

            navigate('/todolist')

        } catch (e) {
            console.error(e)
            alert('Falha ao fazer login, verifique seu email ou senha')
        }

       
    }


    return(

        <div>
            <h1>Login</h1>
            <form action="" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" ref={email}/>
                <input type="password" placeholder="Senha"  ref={password}/>
                <button>Login</button>
            </form>
            <Link to={'/register'}> Não tem uma conta? Cadastre-se</Link>
        </div>

    )


}

export default Login;