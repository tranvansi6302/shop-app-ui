import { Fragment } from 'react'
import AppRouter from './routers/AppRouter'

function App() {
    const appRouter = AppRouter()
    return <Fragment>{appRouter}</Fragment>
}

export default App
