import { useParams} from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { CategoriesContext } from '../../../context/categories.context';
import './category.styles.scss';
import ProductCard from '../../product-card/product-card.component';

const Category = () => {
    const {category} = useParams();
    const {categoriesMap} = useContext(CategoriesContext);
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        setProducts(categoriesMap[category.toLowerCase()]);
    },[category,categoriesMap]);

    return (
        <div>            <h2 className='category-title'>{category}</h2>
        
        <div className='category-container'>
            {
                products && products.map((product)=> <ProductCard key={product.id} product={product}/>)
            }
        </div>

        </div>
    );
}

export default Category;