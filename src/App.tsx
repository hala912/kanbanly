
import './App.css'
import Sidebar from './componants/sidebar/sidebar'
import { AppRoutes } from './Route/route'

function App() {
  
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <AppRoutes />
        </div>
      </div>
    </>
  )
}
 
export default App
