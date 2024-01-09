
import { HomeContainer, ContactContainer, ApiContainer, ProductContainer, ProtectContainer, WeatherApp} from './containers'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PublicLayout from './containers/Layouts/PublicLayout';
import ProtectLayout from './containers/Layouts/ProtectLayout';
import WeatherLayout from './containers/Layouts/WeatherLayout';

function App() {

  const router = createBrowserRouter([
    {
      element: <PublicLayout/>,
      children: [
        {
          path:'/',
          element:<HomeContainer/>
        },
        {
          path:'/Login',
          element:<ContactContainer/>
        },
        {
          path:'/ConnectApi', 
          element:<ApiContainer/>
        },
        {
          path:'/Product-specification', 
          element:<ProductContainer/>
        },
        {
          path:'/Category', 
          element:<ProtectContainer/>
        }

      ]
    },
    {
      path:'/*', 
      element:<h1>ERROR 404</h1>
    },
    {
      element: <WeatherLayout/>,
      children: [(
        {
          path:'/WeatherApp', 
          element:<WeatherApp/>
      }
      )]
    },
    {
      element: <ProtectLayout/>,
      children: [(
        {
          path:'/ConnectApi', 
          element:<ApiContainer/>
        }
      )]
    }
  ])

  return (
    <div className="flex flex-wrap flex-col items-center justify-center">
      <RouterProvider router={router}/>

    </div>

  )
}

export default App
