
import {useRoutes} from 'react-router-dom'
import routes from './routes'
function App() {
  const element = useRoutes(routes) // 传入路由表（数组）
  return (
    <div >
        {element}
    </div>
  );
}

export default App;
