import { useState } from 'react'
import LoginPage from './LoginPage'
import KanbanBoard from './KanbanBoard'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />
  }

  return <KanbanBoard onLogout={() => setIsLoggedIn(false)} />
}

export default App
