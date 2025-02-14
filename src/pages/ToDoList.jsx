import { useState, useEffect, useRef} from "react";
import api from "../services/api";

function ToDoList() {
  const [allList, setAllList] = useState([]);
  const token = localStorage.getItem("token");
  const titleRef = useRef()
  const dateRef = useRef()
  const descriptionRef= useRef()
  const [editTarefa, setEditTarefa] = useState(false)
  const [idList, setIdList] = useState(0)

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const title = titleRef.current.value
      const description = descriptionRef.current.value
      const date = dateRef.current.value

      if(editTarefa){

        const response = await api.put(`/todolist/${parseInt(idList)}`, {
            title,
            description,
            date
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    
        )

        setEditTarefa(false)

      } 
      else {
        
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
      }


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


  const editList = async (idList,title, description, date, isEdit) => {


    try{

        const dateFormat = new Date(date).toISOString().split('T')[0]
        dateRef.current.value = dateFormat
        titleRef.current.value = title
        descriptionRef.current.value = description

  

        setIdList(idList)
        setEditTarefa(isEdit)

    } catch (error) {
        console.error(error);
        alert("Falha ao editar a tarefa");
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
                {editTarefa ?  <button>Editar Tarefa</button> : <button>Adicionar Tarefa</button> }
  
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
              <button onClick={() => editList(list.id, list.title, list.description, list.date, true)}>Editar</button>
              <button onClick={() => deleteList(list.id)}>Deletar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
