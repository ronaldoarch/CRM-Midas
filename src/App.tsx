import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Index from './pages/Index'
import usePageview from './hooks/usePageview'

function App() {
  usePageview();
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
        <Toaster position="top-right" richColors />
      </div>
    </Router>
  )
}

export default App 