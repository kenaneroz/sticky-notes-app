import { useEffect, useRef, useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar.jsx'
import { nanoid } from 'nanoid'
import Todo from './components/Todo.jsx'
import RightBar from './components/RightBar.jsx'
import ConfirmModal from './components/ConfirmModal.jsx'

function App() {
  const savedTodos = JSON.parse(localStorage.getItem('savedTodos'))
  const [todos, setTodos] = useState(() => savedTodos || [])
  const [bg, setBg] = useState('bg-green-200')

  useEffect(() => {
    localStorage.setItem('savedTodos', JSON.stringify(todos))
  }, [todos])
   
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  function newTodo(e, title, content) {
    const date = new Date
    const day = String(date.getDate()).padStart(2, '0')
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    const formattedDate = `${month} ${day}, ${year}`
    
    const todo = {
      id: nanoid(),
      title: title,
      content: content,
      date: formattedDate,
      isPinned: false,
      bgColor: bg,
      isSelected: false
    }
    setTodos(prev => [...prev, todo])
  }

  const [updatingCreating, setUpdatingCreating] = useState('')

  function update() {
    const date = new Date
    const day = String(date.getDate()).padStart(2, '0')
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    const updatedDate = `${month} ${day}, ${year}`
    setTodos(olds => olds.map(old => old.id === selected ? {...old, title: rightBarTitle, content: rightBarContent, date: updatedDate} : old))
  }

  function pin(id) {
    const itemToPin = todos.find(todo => todo.id === id);
    const remainingItems = todos.filter(todo => todo.id !== id);
    setTodos([itemToPin, ...remainingItems])
  }

  function handleDelete(id) {
    setTodos(olds => olds.filter(old => old.id !== id))
  }

  function handleDeleteAll() {
    setTodos([])
  }


  const [selected, setSelected] = useState('')
  function handleSelect(id) {
    if(selected === id) {
      setRightBarShow(prev => !prev)
    } else {
      setRightBarShow(true)
      setSelected(id)
      todos.map(todo => {
        if(todo.id === id) {
          setRightBarTitle(todo.title)
          setRightBarContent(todo.content)
        }
      })
    }
    setUpdatingCreating('editing')
  }



  function handleTodoBgChange(newBg) {
    setTodos(todos => todos.map(todo => todo.id === selected ? {...todo, bgColor: newBg} : todo))
  }

  function handleDelete() {
    setTodos(todos => todos.filter(todo => todo.id !== selected))
  }
  function handleDeleteAll() {
    setTodos([])
  }
  function deleteSelected() {
    setTodos(todos => todos.filter(todo => !todo.isSelected))
  }

  const [rightBarShow, setRightBarShow] = useState(false)
  const stickyNoteElements = todos.map(todo => {
    return <Todo
      key={todo.id}
      todo={todo} 
      pin={pin} 
      handleDelete={handleDelete} 
      handleSelect={handleSelect}
      selected={selected}
      setRightBarShow={setRightBarShow}
    />  
  })

  const savedMode = localStorage.getItem('savedMode')
  const [mode, setMode] = useState(() => savedMode || 'dark')

  useEffect(() => {
    localStorage.setItem('savedMode', mode)
  }, [mode])
  function handleMode(e) {
    if(e.target.id === 'darkModeIcon') setMode('dark')
    else setMode('light')
  }
  
  const [rightBarTitle, setRightBarTitle] = useState('Title')
  const [rightBarContent, setRightBarContent] = useState('Content')

  useEffect(() => {
    if(!rightBarShow) setSelected('')
  }, [rightBarShow])
  useEffect(() => {
    setTodos(todos => todos.map(todo => todo.id === selected ? {...todo, isSelected: true} : {...todo, isSelected: false}))
  }, [selected])

  const [confirmState, setConfirmState] = useState({ isOpen: false, action: null })

  function requestDelete() {
    setConfirmState({ isOpen: true, action: 'deleteOne' })
  }

  function requestDeleteAll() {
    setConfirmState({ isOpen: true, action: 'deleteAll' })
  }

  function handleConfirm() {
    if (confirmState.action === 'deleteAll') {
      handleDeleteAll()
    } else if (confirmState.action === 'deleteOne') {
      handleDelete()
    }
    setConfirmState({ isOpen: false, action: null })
  }

  function handleCancel() {
    setConfirmState({ isOpen: false, action: null })
  }

  function handleConfirm() {
    if (confirmState.action === 'deleteAll') {
      handleDeleteAll()
    } else if (confirmState.action === 'deleteOne') {
      handleDelete()
      setRightBarShow(false)
    }
    setConfirmState({ isOpen: false, action: null })
  }

  function handleCancel() {
    setConfirmState({ isOpen: false, action: null })
  }

  return (
    <div className={`${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} md:flex`}>
      <Sidebar 
        newTodo={newTodo} 
        mode={mode}
        handleMode={handleMode}
        handleDeleteAll={requestDeleteAll}
        setRightBarShow={setRightBarShow}
        setRightBarTitle={setRightBarTitle}
        setRightBarContent={setRightBarContent}
        setUpdatingCreating={setUpdatingCreating}
        deleteSelected={deleteSelected}
        selected={selected}
        setSelected={setSelected}
      />
      {
        todos.length === 0 
        ?
        <p className={`${mode === 'dark' ? 'text-gray-100' : 'text-gray-700'} h-screen w-full flex justify-center items-center`}>You haven't added anything yet.</p>
        :
        <div className="relative h-screen w-full flex flex-wrap gap-[10px] p-[25px] md:p-[100px] overflow-y-scroll">{stickyNoteElements}</div>
      }
      <RightBar 
        rightBarShow={rightBarShow}
        newTodo={newTodo}
        rightBarTitle={rightBarTitle}
        setRightBarShow={setRightBarShow}
        setRightBarTitle={setRightBarTitle}
        rightBarContent={rightBarContent}
        setRightBarContent={setRightBarContent}
        updatingCreating={updatingCreating}
        update={update}
        handleDelete={requestDelete}
        setBg={setBg} 
        bg={bg} 
        handleTodoBgChange={handleTodoBgChange}
      />

      <ConfirmModal
        isOpen={confirmState.isOpen}
        title="Are you sure?"
        message={confirmState.action === 'deleteAll' 
          ? "This will delete all your notes." 
          : "This note will be permanently deleted."}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        mode={mode}
      />
    </div>
  )
}
 
export default App
