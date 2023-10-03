import { useEffect, useState } from 'react';
import axios from 'axios';
import ListItem from './components/ListItem';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = "http://localhost:6060";

function App() {

  const [todos, setTodos] = useState(null)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState()
  const [maxPage, setMaxPage] = useState()

  const options = {
    _limit: 5,
    _page: page,
  }

    useEffect(() => {
    axios
    .get('/todos', { params: options })
      .then((res) => {

        const itemCount = Number(res.headers['x-total-count']) ;  

        const max = Math.ceil(itemCount / options._limit);
        setMaxPage(max);
        setTotalCount(itemCount)
        setTodos(res.data)
      })
      .catch((error) => console.log(error))
  }, [page])

  const handleSubmit = (e) => {
    //forma onSubmit özelliği vediğimizden sayfanın yenilenmesini engellememiz gerekli
    e.preventDefault();

    // input boş veri gönderme
    if (e.target[0].value === "") {
      toast.error('Lütfen formu doldurun.. ', {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    // eklenecek veri iiçin obje tanımlama
    const newTodo = {
      id: new Date().getTime(),
      title: e.target[0].value,
      isDone: false,
      date: new Date()
    }
    // veriyi db.json a gönderme
    axios.post('/todos', newTodo)
      // state yi güncelleme
      .then(() => {
        // sonraki sayfaya geçme
        if (todos.length === options._limit) {
          setPage(totalCount % options._limit === 0 ? maxPage + 1 : maxPage);
          return;
        }              

        setTodos([...todos, newTodo]),
          toast.success('Başarıyla eklendi', {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
      }
      )
    // inputu temizleme
    e.target[0].value = ""
  }


  return (
    <div className="container m-5">
      <h1 className="bg-danger mx-5 text-center p-2 fw-bold">Yapılacaklar Listesi</h1>
      <form onSubmit={handleSubmit} className="d-flex justify-content-center align-item-center my-5">
        <input type="text" placeholder='Welcome' className="form-control bg-warning fs-3 text-center w-50" />
        <button className="btn btn-primary fs-4">Ekle</button>
      </form>

      {!todos && (<h3 className='text-center mt-5 text-danger'>Yükleniyor !</h3>)}

      <ul className="container mt-3 w-75">
        {todos?.map((todo) =>
          <ListItem key={todo.id} todo={todo} todos={todos} page={page} setTodos={setTodos} setPage={setPage} setMaxPage={setMaxPage} options={options} maxPage={maxPage} />
        )}
      </ul>

      <div className='d-flex justify-content-center align-items-center my-5 gap-3'>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)} className='btn btn-primary'>Geri</button>
        <p className='fs-3 rounded bg-dark px-4 py-1'>{page}</p>
        <button disabled={page === maxPage} onClick={() => setPage(page + 1)} className='btn btn-primary'>İleri</button>
      </div>

      <ToastContainer />

      <a href='https://www.linkedin.com/in/ilkhukuk/' target="_blank" className='fixed-bottom bg-light text-dark fs-4 fw-bolder text-decoration-none text-center'>&copy; 2023 ilkhukuk</a>
    </div>
  );
}

export default App
