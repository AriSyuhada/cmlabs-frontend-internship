import { useEffect, useState } from 'react';
import './App.css';
import CategoryWrapper from './Components/CategoryWrapper';

function App() {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(response => response.json())
      .then(json => json.categories)
      .then(data => setCategories(data))
      .catch(error => console.error(error));
  }, []);

  const listCategory = categories.map((category) => 
    <div key={category.idCategory} className='mx-4 my-4'>
      <CategoryWrapper 
        name={category.strCategory} 
        description={category.strCategoryDescription} 
        thumbnail={category.strCategoryThumb} 
      />
    </div>
  );

  return (
    <div className="App">
      <div className='bg-gray-100 w-auto py-28 rounded-md text-5xl font-bold'>
        <h2>See All The Delicious Foods</h2>
      </div>
      <div className='my-16 mx-20'>
        <div className='flex flex-wrap px-4 py-4 justify-center'>
          {listCategory}
        </div>
      </div>
    </div>
  );
}

export default App;
