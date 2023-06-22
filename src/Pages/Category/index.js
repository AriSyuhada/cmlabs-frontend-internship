import { useLocation } from 'react-router-dom';
import '../../App.css';
import { useEffect, useMemo, useState } from 'react';
import MealWrapper from '../../Components/MealWrapper';

function Category() {
    const params = useLocation().search;
    const searchParams = useMemo(() => new URLSearchParams(params), [params]);
    const [meals, setMeals] = useState([]);

    // https://www.themealdb.com/api/json/v1/1/filter.php?c=beef

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + searchParams.get('name'))
            .then(response => response.json())
            .then(json => json.meals)
            .then(data => setMeals(data))
            .catch(error => console.error(error));
    }, [searchParams])

    const listMeal = meals.map((meal) =>
        <div key={meal.idMeal} className='mx-4 my-4'>
            <MealWrapper 
                name={meal.strMeal}
                thumbnail={meal.strMealThumb}
                dataId={meal.idMeal}
            />
        </div>
    );

    return (
        <div className="category">
            <div className='w-[77%] mx-auto'>
                <h2 className='font-semibold text-5xl my-12'>{searchParams.get('name')} Meals</h2>
                <div className='flex flex-wrap px-4 py-4 justify-center'>
                    {listMeal}
                </div>
            </div>
        </div>
    );
}

export default Category;
