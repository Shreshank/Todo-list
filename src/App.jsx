import React from 'react'
import NavBar from './components/NavBar'

// react icon is a great npm package that gives icons as a components to use
// uuid is a npm package that helps us to create unique id in our code
import { v4 as uuidv4 } from 'uuid'

function App() {

  const [Todo, setTodo] = React.useState('')
  const [Finsh, setFinsh] = React.useState(true)
  const [Todos, setTodos] = React.useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  })
  
  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(Todos));
  }, [Todos])

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleSave = () => {
    if(Todo.trim() != ''){
      setTodos([...Todos , {id: uuidv4(), todo: Todo.trim() , isCompleted: false }])
      setTodo('')
    } else {
      alert('enter some text.')
      setTodo('')
    }
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  }

  const handleCheckList = (e) => {
    let id = e.target.name;
    let newTodos = Todos.filter(item => {
      if(id === item.id){
        item.isCompleted = !item.isCompleted
      }
      return true
    })
    setTodos(newTodos)
  }

  const handleFinish = (e) => {
    setFinsh(!Finsh)
  }

  const handleDelete = (e , id) => {
    // let userConfirm = confirm('Are you sure you want to delete this item?')
    let newTodos = Todos.filter((item) => {return id !== item.id})
    setTodos(newTodos)
  }

  const handleEdit = (e , id) => {
    let newTodos = [];
    let state = false;
    if(Todo.trim() == '') {
      for (let i = 0; i < Todos.length; i++) {
        if(id === Todos[i].id) {
          setTodo(Todos[i].todo)
          state = Todos[i].isCompleted
        } else {
          newTodos.push(Todos[i])
        }
      }
      setTodos(newTodos)
    } else {
      handleSave()
    }
  }

  return (
    <>
      <main className='w-[100vw] h-[100vh] flex flex-col items-center bg-[#1e0031] text-white'>
        <NavBar />
        <div className="card w-[90%] sm:w-[60%] lg:w-[40%] h-[90%] bg-[#33333359] my-4 *:mb-3 rounded-2xl px-0.5 py-2.5 block overflow-y-scroll">
            <h1 className='text-center font-bold text-2xl text-[#9a23ea] p-3'>Todo - Never Forget Your Task</h1>

            <div className="w-full px-5 block">
              <h1 className='font-bold text-[18px] mb-2'>Add a Todo</h1>
              <div className='*:rounded-full flex gap-3 items-center'>
                <input type="text" className='w-[90%] bg-[#342638] px-2 py-1 focus-visible:rounded-full' name='todoAdd' onKeyDown={handleEnterPress} onChange={handleChange} value={Todo} id='todoAdd' placeholder='Add Here' />
                <button onClick={handleSave} className='bg-[#c06bf4] px-2.5 py-1 font-bold cursor-pointer'>Save</button>
              </div>
            </div>

            <div className='px-5 py-2 w-full flex gap-2'>
              <input className='cursor-pointer' type="checkbox" name="finish" id="finish" onChange={handleFinish} defaultChecked={Finsh} />
              <label htmlFor="finish">Show Finished</label>
            </div>

            <div className="sep px-5 w-[85%] h-[1px] m-auto bg-black"></div>

            <div className='px-5 py-2 w-full block'>
              <h1 className='font-bold text-[18px]'>Your Todos</h1>
              <div className="w-full my-2.5">

                {Todos.length === 0 && <div className="font-bold text-center my-15">No Todos to display</div> }
                {Todos.map((item, index) => {
                  return (Finsh || !item.isCompleted) && <div key={item.id} className="list w-full h-[60px] flex justify-between items-center bg-[#3e076b] rounded-2xl mb-1 py-1 px-2">
                            {/* truncate */}
                            <div className='w-[85%] h-full flex items-center'>
                              <input className='cursor-pointer w-[15px] h-[15px] mr-3' onChange={handleCheckList} type="checkbox" name={item.id} id="listCheck" defaultChecked={item.isCompleted} />
                              <label className={item.isCompleted ? 'max-h-full overflow-y-scroll line-through' : 'max-h-full overflow-y-scroll'} htmlFor="listCheck">{item.todo}</label>
                            </div>
                            <div className='flex gap-3 *:cursor-pointer'>
                              <button onClick={(e) => {handleEdit(e , item.id)}}><img className='w-6' src="edit.svg" alt="edit" /></button>
                              <button onClick={(e) => {handleDelete(e , item.id)}}><img className='w-6' src="delete.svg" alt="delete" /></button>
                            </div>
                        </div>
                })}
              </div>
            </div>
        </div>
      </main>
    </>
  )
}

export default App
