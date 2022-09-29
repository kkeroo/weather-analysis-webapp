import './Layout.css';
import FormComponent from './FormComponent';
import Footer from './Footer';

const Layout = (props) => {
    return (
        <div className='background'>
            <FormComponent></FormComponent>
            <Footer></Footer>
        </div>
    )
};

export default Layout;