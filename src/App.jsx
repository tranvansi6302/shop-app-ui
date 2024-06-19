import { Fragment } from 'react'
import AppRouter from './routers/AppRouter'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
    const appRouter = AppRouter()
    return (
        <Fragment>
            {appRouter}
            <ToastContainer autoClose='1500' />
        </Fragment>
    )
}

export default App
