import { keepPreviousData, useQuery } from '@tanstack/react-query'
import categoryApi from '../../../../apis/category.api'
import brandApi from '../../../../apis/brand.api'

export default function Asidebar() {
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryApi.getAllCategories(),
        placeholderData: keepPreviousData
    })

    const { data: brands } = useQuery({
        queryKey: ['brands'],
        queryFn: () => brandApi.getAllBrands(),
        placeholderData: keepPreviousData
    })

    return (
        <div className='col-lg-3'>
            <div className='shop__sidebar'>
                <div className='shop__sidebar__search'>
                    <form action='#'>
                        <input type='text' placeholder='Search...' />
                        <button type='submit'>
                            <span className='icon_search' />
                        </button>
                    </form>
                </div>
                <div className='shop__sidebar__accordion'>
                    <div className='accordion' id='accordionExample'>
                        <div className='card'>
                            <div className='card-heading'>
                                <a data-toggle='collapse' data-target='#collapseOne'>
                                    Danh mục
                                </a>
                            </div>
                            <div id='collapseOne' className='collapse show' data-parent='#accordionExample'>
                                <div className='card-body'>
                                    <div className=''>
                                        <ul
                                            className='nice-scroll'
                                            tabIndex={1}
                                            style={{ overflowY: 'hidden', outline: 'none' }}
                                        >
                                            {categories?.data?.result.map((category) => (
                                                <li key={category.id}>
                                                    <p>{category.name}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-heading'>
                                <a data-toggle='collapse' data-target='#collapseTwo'>
                                    Thương hiệu
                                </a>
                            </div>
                            <div id='collapseTwo' className='collapse show' data-parent='#accordionExample'>
                                <div className='card-body'>
                                    <div className='shop__sidebar__brand'>
                                        <ul>
                                            {brands?.data?.result.map((brand) => (
                                                <li key={brand.id}>
                                                    <p>{brand.name}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-heading'>
                                <a data-toggle='collapse' data-target='#collapseThree'>
                                    Filter Price
                                </a>
                            </div>
                            <div id='collapseThree' className='collapse show' data-parent='#accordionExample'>
                                <div className='card-body'>
                                    <div className='shop__sidebar__price'>
                                        <ul>
                                            <li>
                                                <a href='#'>$0.00 - $50.00</a>
                                            </li>
                                            <li>
                                                <a href='#'>$50.00 - $100.00</a>
                                            </li>
                                            <li>
                                                <a href='#'>$100.00 - $150.00</a>
                                            </li>
                                            <li>
                                                <a href='#'>$150.00 - $200.00</a>
                                            </li>
                                            <li>
                                                <a href='#'>$200.00 - $250.00</a>
                                            </li>
                                            <li>
                                                <a href='#'>250.00+</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='card'>
                            <div className='card-heading'>
                                <a data-toggle='collapse' data-target='#collapseSix'>
                                    Tags
                                </a>
                            </div>
                            <div id='collapseSix' className='collapse show' data-parent='#accordionExample'>
                                <div className='card-body'>
                                    <div className='shop__sidebar__tags'>
                                        <a href='#'>Product</a>
                                        <a href='#'>Bags</a>
                                        <a href='#'>Shoes</a>
                                        <a href='#'>Fashio</a>
                                        <a href='#'>Clothing</a>
                                        <a href='#'>Hats</a>
                                        <a href='#'>Accessories</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
