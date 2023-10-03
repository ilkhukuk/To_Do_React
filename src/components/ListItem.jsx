import axios from "axios"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from "react";
import 'react-toastify/dist/ReactToastify.css';

const ListItem = ({ todo, todos, setTodos, setMaxPage, options, maxPage, setPage }) => {

    const [isEdit, setIsEdit] = useState(false)

    const inputRef = useRef();

    const handleDelete = () => {
        axios.delete(`/todos/${todo.id}`)
            .then(() => {
                const filtered = todos.filter((f) => f.id !== todo.id)
                setTodos(filtered)
                toast.error('Başarı ile Silindi!', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
               
            }
            )
    }


    const handleChange = (e) => {
        // isDone tersine çevirme
        const update = { ...todo, isDone: !todo.isDone }

        // güncelleme
        axios.put(`/todos/${todo.id}`, update)
            .then(() => {
                const filtered = todos.map((item) => item.id === update.id ? update : item)
                setTodos(filtered)
            })
    }

    const handleEdit = () => {
        const update = { ...todo, title: inputRef.current.value }
        axios.put(`todos/${update.id}`, update)
            .then(() => {
                const filtere = todos.map((i) => i.id === update.id ? update : i);
                setTodos(filtere) // state güncelleme
                toast.info('Başarı ile düzenlendi', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
            
            })
    }

    return (
        <li className="row rounded border m-1 p-2  d-flex align-items-center bg-light text-dark">

            <div className="col d-flex align-items-center gap-1">
                <input onChange={handleChange} checked={todo.isDone} type="checkbox" className="form-check-input fs-4" /> <br />
                <span className="fs-6 fw-bold">{todo.isDone ? 'Tamamlandı' : 'Devam ediyor'}</span>
            </div>
            <div className="col text-center">{isEdit ? (<input ref={inputRef} className="form-control fw-bold" defaultValue={todo.title} />) : (<span className="fs-4 fw-bold">{todo.title}</span>)}</div>
            <div className="col">
                {isEdit ? (<div className="d-flex justify-content-end  align-item-center">
                    <button onClick={() => {handleEdit(); setIsEdit(!isEdit)}} className="btn btn-success">Onayla</button>
                    <button onClick={() => setIsEdit(!isEdit)} className="btn btn-warning">Vazgeç</button>
                </div>) : (<div className="d-flex justify-content-end  align-item-center">
                    <button onClick={() => setIsEdit(!isEdit)} className="btn btn-info">Düzenle</button>
                    <button onClick={handleDelete} className="btn btn-danger">Sil</button>
                </div>)}
            </div>
            <ToastContainer />
        </li>
    )
}

export default ListItem




