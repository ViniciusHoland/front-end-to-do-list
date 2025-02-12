import { useRef } from "react";
import api from '../services/api.js'


function Login() {

    const email = useRef()
    const password = useRef()

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

            alert(response.data.message)

        } catch (e) {
            console.error(e)
            alert('Falha ao fazer login, verifique seus dados')
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
        </div>

    )


}

export default Login;