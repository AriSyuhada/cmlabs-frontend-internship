import { useEffect, useMemo, useState } from 'react';
import '../../App.css';
import { useLocation } from 'react-router-dom';

function Meal() {
    const params = useLocation().search;
    const searchParams = useMemo(() => new URLSearchParams(params), [params]);
    const [meal, setMeal] = useState([]);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + searchParams.get('id'))
            .then(response => response.json())
            .then(json => json.meals)
            .then(data => setMeal(...data))
            .catch(error => console.error(error));
    }, [searchParams]);

    let youtubeURL;
    if (meal.length !== 0) {
        youtubeURL = meal.strYoutube.replace('watch?v=', 'embed/');
    }

    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal['strIngredient' + i] === '' || meal['strIngredient' + i] === null) continue;
        ingredients.push(
            <div key={'ingredient ' + i} className='px-2 py-2'>
                <p className='text-lg capitalize'>{meal['strMeasure' + i]} {meal['strIngredient' + i]}</p>
            </div>
        );
    }

    // www.themealdb.com/api/json/v1/1/lookup.php?i=52874

    return (
        <div className="meal">
            <div className='w-[77%] mx-auto'>
                <h2 className='font-semibold text-5xl my-12'>{meal.strMeal}</h2>
                <h3 className='font-semibold text-xl text-red-500 mb-5'>{meal.strArea} Culinary</h3>
                <div className='grid grid-cols-1 xl:grid-cols-2 mb-8 space-y-4'>
                    <img className='rounded-2xl pr-3 w-full' src={meal.strMealThumb} alt={meal.strMeal} />
                    <div className='pl-3'>
                        <h4 className='text-5xl mb-5'>Instructions</h4>
                        <p className='text-justify mb-5'>{meal.strInstructions}</p>
                        <h4 className='text-5xl mb-5'>Recipes</h4>
                        <div className='flex flex-row flex-wrap'>
                            {ingredients}
                        </div>
                    </div>
                </div>
                <h4 className='text-5xl mb-5 text-center'>Tutorials</h4>
                <div className='relative w-full overflow-hidden pt-[56.25%] mx-auto mb-16'>
                    <iframe className='absolute top-0 left-0 bottom-0 right-0 w-full h-full border-none' title={meal.strMeal} src={youtubeURL}></iframe>
                </div>
            </div>
        </div>
    );
}

export default Meal;
