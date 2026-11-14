
import './App.css'
import Sidebar from './componants/Sidebar/sidebar'
import { AppRoutes } from './Route/route'

function App() {
  
  return (
    <>
      <div className="flex overflow-auto">
        <Sidebar />
        <div className="flex-1">
          <AppRoutes />
        </div>
      </div>
    </>
  )
}
 
export default App
