import {useLocation, Link} from 'react-router-dom';
const ShowMessage =  ()=>{
    const location = useLocation(); 
    const propsData = location?.state;
    const data = propsData?.title || 111;  
    return(
        <div>
            <h1>{data}</h1>
            <Link to="/register">Go to Register</Link>
        </div>
    )
}
export default ShowMessage;