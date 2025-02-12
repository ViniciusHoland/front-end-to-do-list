import { Link } from "react-router-dom";
import { useRef } from "react";
import api from '../services/api'

function Register() {

    const name = useRef();
    const email = useRef();
    const password = useRef();


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



        }catch(e){
            console.log(e.response)
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
                <button>Login</button>
            </form>
            <Link to={'/login'}> Já tem uma conta? Log In</Link>
        </div>

        


    )


}

export default Register;