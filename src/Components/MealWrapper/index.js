import { useNavigate } from 'react-router-dom';
import '../../App.css';

function MealWrapper(props) {
    const navigate = useNavigate();

    const navigatePath = () => {
        let path = '/meal?id=' + props.dataId;
        navigate(path);
    }

    return (
        <>
            <div 
                className='flex w-80 h-80 rounded-2xl cursor-pointer text-center'
                style={{
                    backgroundImage: 'url(' + props.thumbnail + ')',
                    backgroundRepeat: 'no-repeat',
                    filter: 'blur',
                    backgroundSize: 'cover',
                    overflow: 'hidden',
                }}
                onClick={navigatePath}
            >
                <p className='w-full h-full p-12 flex items-center justify-center bg-gray-800 bg-opacity-50 text-white text-lg font-bold'>{props.name}</p>
            </div>
        </>
    );
}

export default MealWrapper;
