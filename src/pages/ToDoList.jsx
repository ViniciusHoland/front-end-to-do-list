import { useState, useEffect} from "react";
import api from '../services/api'

function ToDoList(){

    const [allList, setAllList] = useState([])


    async function getAllList(){

        try{
            const token = localStorage.getItem('token')

            const response = await api.get('/todolist', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data)
            setAllList(response.data)


        }catch (e) {
            console.error(e)
            if(e.response.status == 404){
                alert('Sem nenhuma tarefa cadastrada')
                return
            } else {
                alert('Falha ao buscar as tarefas')
                return  // evita que a função seja chamada novamente se houver um erro
            }
            
        }

    }

    useEffect(() =>{

        getAllList()

    },[])


    return (

        
        <div>
            <h1>Minhas Tarefas</h1>
            <ul>
                {allList.map( (list) => (
                    <li key={list.id}>
                        <h1>{list.title}</h1>
                        <p>{list.description}</p>
                        <p>{new Date(list.date).toLocaleDateString('pt-BR')}</p>
                    </li>
                ))}
            </ul>
        </div>
        

    )



}

export default ToDoList;