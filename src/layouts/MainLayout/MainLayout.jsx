import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import Header from '../../components/Header'

export default function MainLayout({ children }) {
    return (
        <div className=''>
            <Header />
            <Breadcrumb />

            {children}
        </div>
    )
}
