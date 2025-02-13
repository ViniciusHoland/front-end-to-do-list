import { useState, useEffect, useRef} from "react";
import api from "../services/api";

function ToDoList() {
  const [allList, setAllList] = useState([]);
  const token = localStorage.getItem("token");
  const titleRef = useRef()
  const dateRef = useRef()
  const descriptionRef= useRef()

  async function getAllList() {
    try {

      const response = await api.get("/todolist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
   
      setAllList(response.data);

    } catch (e) {
      console.error(e);
      if (e.response.status == 404) {
        alert("Sem nenhuma tarefa cadastrada");
        return;
      } else {
        alert("Falha ao buscar as tarefas");
        return; // evita que a função seja chamada novamente se houver um erro
      }
    }
  }

  function showAllList(){

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        const title = titleRef.current.value
        const description = descriptionRef.current.value
        const date = dateRef.current.value

        const response = await api.post('/todolist', {
                title,
                description,
                date
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )

        dateRef.current.value = ''
        titleRef.current.value = ''
        descriptionRef.current.value = ''

        getAllList()

    }catch (err) {
        console.error(err);
        alert("Falha ao adicionar a tarefa");
        return;
    }
      
  }

  const deleteList = async (idList) => {

    try{

        const response = await api.delete(`/todolist/${idList}`, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }            
        )

        alert(response.data.message)
        getAllList()

    }catch(err) {
        console.error(err);
        alert("Falha ao deletar a tarefa");
        return;
    }

  }



  useEffect(() => {
    getAllList();
  }, []);

  return (
    <div>

        <div>
            <form action="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Título da tarefa"
                  ref={titleRef}
                  required
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Descrição da tarefa"
                  ref={descriptionRef}
                  required
                />
                <input type="date" name="date" ref={dateRef} required />
                <button>Adicionar Tarefa</button>
  
            </form>
        </div>



      <div>
        <h1>Minhas Tarefas</h1>
        <ul>
          {allList.map((list) => (
            <li key={list.id}>
              <h1>{list.title}</h1>
              <p>{list.description}</p>
              <p>{new Date(list.date).toLocaleDateString("pt-BR")}</p>
              <button >Editar</button>
              <button onClick={() => deleteList(list.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
