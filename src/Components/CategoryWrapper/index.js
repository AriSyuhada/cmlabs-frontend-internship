import { useNavigate } from 'react-router-dom';
import '../../App.css';

function CategoryWrapper(props) {
    const navigate = useNavigate();

    const navigatePath = () => {
        let path = '/category?name=' + props.name;
        navigate(path);
    }

    return (
        <>
            <div 
                className=' w-60 rounded-2xl cursor-pointer' 
                style={{
                    backgroundImage: 'url(' + props.thumbnail + ')',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur',
                    backgroundSize: 'cover',
                    overflow: 'hidden',
                }}
                onClick={navigatePath}
            >
                <p className='w-full p-12 h-full bg-gray-800 bg-opacity-50 text-white text-lg font-bold'>{props.name}</p>
            </div>
        </>
    );
}

export default CategoryWrapper;
