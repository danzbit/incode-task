import { ReactElement } from "react"
import { Route, Routes } from "react-router-dom"
import routes from "./Routes"
import './assets/styles/app.scss'

function App(): ReactElement {
  return (
    <div className="container">
      <Routes>
        {routes.map(({ name, path, Component }, index) => (
          <Route key={name + index} path={path} element={<Component />}/>
        ))}
      </Routes>
    </div>
  )
}

export default App
