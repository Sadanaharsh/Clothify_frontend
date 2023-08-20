import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';

import { Slider, Checkbox } from 'antd'
import {getCategoryById} from '../../functions/category'
import {getSubsByCategory} from '../../functions/sub'
import {getBrands} from '../../functions/brand'
import {fetchProductsByFilter} from '../../functions/product'
import ProductScrollCard from '../../components/cards/ProductScrollCard'
import Star from '../../components/forms/Star'

import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import {AiOutlineDownSquare, AiOutlineStar} from 'react-icons/ai'
import {MdOutlineCategory, MdOutlineInvertColors, MdOutlineLocalShipping} from 'react-icons/md'
import {SiBrandfolder} from 'react-icons/si'
import {CgSize} from 'react-icons/cg'
import {VscCollapseAll} from 'react-icons/vsc'

const CategoryHome = () => {

    const [price, setPrice] = useState([0, 0]);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState([]);
    const [star, setStar] = useState('');
    const [brands, setBrands] = useState([]);
    const [brand, setBrand] = useState('');
    const [shipping, setShipping] = useState('');
    const [colors, setColors] = useState(['Red', 'Black', 'White', 'Blue', 'Brown', 'Yellow', 'Orange', 'Pink', 'Grey', 'Green', 'Purple']);
    const [color, setColor] = useState('');
    const [sizes, setSizes] = useState(['S', 'M', 'L', 'XL', 'XXL', 'XXXL']);
    const [size, setSize] = useState('');
    const [genders, setGenders] = useState(['Men', 'Women', 'Unisex']);
    const [gender, setGender] = useState('');
    const [collapsed, setCollapsed] = useState(false)

    const [ok, setOk] = useState(false);
    
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');

    const {_id} = useParams();

    const dispatch = useDispatch();
    const { collapseSidebar } = useProSidebar();
    let { search } = useSelector((state) => ({...state}));
    const {text} = search;

    useEffect(() => {
        // console.log('screen-width --> ', window.screen.width);
        if (window.screen.width <= 768) {
            setCollapsed(true)
        } else {
            setCollapsed(false)
        }
    }, [])

    useEffect(() => {
        fetchProducts({ price });
    }, [ok])

    useEffect(() => {
        loadCategory();
        getBrands().then(res  => setBrands(res.data));
    }, [])

    useEffect(() => {
        fetchProducts({category:[ _id]})
    }, [])

    // 1. Load products & category by default on page load
    const loadAllProducts = () => {
        fetchProducts({category:[ _id]})
    }

    const loadCategory = () => {
        setLoading(true);
        getCategoryById(_id).then(c => {
            setCategory(c.data);
            setLoading(false);
        })

        getSubsByCategory(_id).then(res => {
            setSubs(res.data)
        });

    }

    // 2. Load products on search input
    useEffect(() => {
        // console.log(text);
        const delayed = setTimeout(() => {
            fetchProducts({query: text});
        }, 1000);
        return () => clearTimeout(delayed);
    }, [text])

    const fetchProducts = (arg) => {
        // setLoading(true);
        fetchProductsByFilter(arg).then(res => {
            setProducts([...res.data]);
            setLoading(false);
            // console.log(res.data);
        })
    }

    // 3. Products by price

    const handlePrice = (value) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        })
        setCategoryIds([]);
        setStar('');
        setSub('');
        setShipping('');
        setBrand('');
        setColor('');
        setGender('');
        setSize('');
        
        setPrice(value);
        setTimeout(() => {
            setOk(!ok);
        }, 500);
    }

    // 4. Products by categories
    const showCategories = () => categories.map((c) => <div key={c._id}>
        <Checkbox onChange={handleCategories} className='pb-2 pl-4 pr-4' value={c._id} name='category' checked={categoryIds.includes(c._id)}  >{c.name}</Checkbox> <br />
    </div>)

    const handleCategories = (e) => {
        // console.log(e.target.value);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        });
        setPrice([0, 0]);
        setStar('');
        setSub('');
        setShipping('');
        setBrand('');
        setColor('');
        setGender('');
        setSize('');
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1
        if (foundInTheState === -1){
            inTheState.push(justChecked);
        } else {
            inTheState.splice(foundInTheState, 1);
        }

        setCategoryIds(inTheState);
        // console.log(inTheState);
        fetchProducts({category: inTheState});
    }

    // 5. Products by subcategories
    const showSubs = () => subs.map((s) => <div key={s._id} className="cursor-pointer" >
        <Checkbox onChange={handleSubs} value={s._id} name='sub'  >{s.name}</Checkbox>
    </div> )

    const handleSubs = (e) => {
        // console.log('SUB', sub.target.value);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        });
        setPrice([0, 0]);
        setStar('');
        setShipping('');
        setBrand('');
        setColor('');
        setGender('');
        setSize('');
        setCategoryIds([]);

        setSub(e.target.value);
        fetchProducts({ sub: e.target.value });
    }

    // 6. Products by star rating
    const handleStarClick = (num) => {
        // console.log(num);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        });
        setPrice([0, 0]);
        setSub('');
        setShipping('');
        setBrand('');
        setColor('');
        setGender('');
        setSize('');
        setCategoryIds([]);

        setStar(num);
        fetchProducts({ stars: num });
    }

    const showStars = () => {
        // console.log('star');
        return (
            <div className=''>
                <Star starClick={handleStarClick} numberOfStars={5} />
                <Star starClick={handleStarClick} numberOfStars={4} />
                <Star starClick={handleStarClick} numberOfStars={3} />
                <Star starClick={handleStarClick} numberOfStars={2} />
                <Star starClick={handleStarClick} numberOfStars={1} />
            </div>
        )
    }

    // 7. Product by brands
    const showBrands = () => brands.map((b) => <div key={b._id} className='cursor-pointer'>
        <Checkbox onChange={handleBrands} value={b._id} name='brand'  >{b.name}</Checkbox>
    </div>)

    const handleBrands = (e) => {
        // console.log(e.target.value);
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        });
        setPrice([0, 0]);
        setSub('');
        setShipping('');
        setColor('');
        setGender('');
        setSize('');
        setColor('');
        setCategoryIds([]);

        setBrand(e.target.value);
        fetchProducts({ brand: e.target.value });
    }

    // 8. Product by shipping
    const showShipping = () => (<div>
        <div className='cursor-pointer'>
            <Checkbox onChange={handleShipping} value={'Yes'} name='brand'  >Yes</Checkbox>
        </div>
        <div className='cursor-pointer'>
            <Checkbox onChange={handleShipping} value={'No'} name='brand'  >No</Checkbox>
        </div>
    </div>)

    const handleShipping = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        });
        setPrice([0, 0]);
        setSub('');
        setColor('');
        setGender('');
        setSize('');
        setColor('');
        setStar('')
        setCategoryIds([]);

        setShipping(e.target.value);
        fetchProducts({ shipping: e.target.value});
    }

    // 9. Product by color
    const showColors = () => colors.map((c, i) => <div key={i} className='cursor-pointer'>
        <Checkbox onChange={handleColors} value={c} name='color'  >{c}</Checkbox>
    </div>)
    
    const handleColors = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        });
        setPrice([0, 0]);
        setSub('');
        setGender('');
        setStar('')
        setShipping('');
        setSize('');
        setCategoryIds([]);
        
        setColor(e.target.value);
        fetchProducts({ color: e.target.value });
    }

    // 9. Product by Size
    const showSizes = () => sizes.map((s, i) => <div key={i} className='cursor-pointer'>
        <Checkbox onChange={handleSizes} value={s} name='size'  >{s}</Checkbox>
    </div>)

    const handleSizes = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        });
        setPrice([0, 0]);
        setSub('');
        setColor('');
        setGender('');
        setColor('');
        setStar('')
        setShipping('');
        setCategoryIds([]);
        
        setSize(e.target.value);
        fetchProducts({ size: e.target.value });
    }

    // 9. Product by Gender
    const showGenders = () => genders.map((g, i) => <div key={i} className='cursor-pointer'>
        <Checkbox onChange={handleGenders} value={g} name='gender'  >{g}</Checkbox>
    </div>)

    const handleGenders = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: '' }
        });
        setPrice([0, 0]);
        setSub('');
        setColor('');
        setSize('');
        setColor('');
        setStar('')
        setShipping('');
        setCategoryIds([]);
        
        setGender(e.target.value);
        fetchProducts({ gender: e.target.value });
    }

  return (
    <div className=''>
        <h4 className='text-xl font-semibold p-4'>Search/Filter</h4>
        <hr />
        <div className='flex'>
            {/* Price */}
            <Sidebar style={{zIndex: '30'}} defaultCollapsed={collapsed} className='md' >
                <Menu>
                    <button className='ml-6 mt-3' onClick={() => collapseSidebar()}><VscCollapseAll size={20} className='' /> collapse</button>
                </Menu>
                <Menu>
                    <SubMenu label="Price" icon={<HiOutlineCurrencyRupee />}>
                        <MenuItem style={{height: '100%'}}><Slider range value={price} onChange={handlePrice} max='4999' /></MenuItem>
                    </SubMenu>
                </Menu>
                {/* <Menu>
                    <SubMenu label="Categories" icon={<MdOutlineCategory />}>
                        <MenuItem style={{height: '100%'}}>{showCategories()}</MenuItem>
                    </SubMenu>
                </Menu> */}
                <Menu>
                    <SubMenu label="Brands" icon={<SiBrandfolder />}>
                        <MenuItem style={{height: '100%'}}>{showBrands()}</MenuItem>
                    </SubMenu>
                </Menu>
                <Menu>
                    <SubMenu label="Colors" icon={<MdOutlineInvertColors />}>
                        <MenuItem style={{height: '100%'}}>{showColors()}</MenuItem>
                    </SubMenu>
                </Menu>
                <Menu>
                    <SubMenu label="Size" icon={<CgSize />}>
                        <MenuItem style={{height: '100%'}}>{showSizes()}</MenuItem>
                    </SubMenu>
                </Menu>
                <Menu>
                    <SubMenu label="Gender" icon={<AiOutlineDownSquare />}>
                        <MenuItem style={{height: '100%'}}>{showGenders()}</MenuItem>
                    </SubMenu>
                </Menu>
                <Menu>
                    <SubMenu label="Ratings" icon={<AiOutlineStar />}>
                        <MenuItem style={{height: '100%'}}>{showStars()}</MenuItem>
                    </SubMenu>
                </Menu>
                <Menu>
                    <SubMenu label="Sub Categories" icon={<MdOutlineCategory />}>
                        <MenuItem style={{height: '100%'}}>{showSubs()}</MenuItem>
                    </SubMenu>
                </Menu>
                <Menu>
                    <SubMenu label="Shipping" icon={<MdOutlineLocalShipping />}>
                        <MenuItem style={{height: '100%'}}>{showShipping()}</MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>

            <div className='col-span-3'>
                <div className='mx-6 mt-4'>
                    {loading ? <h4 className='text-red-600 text-2xl font-bold'>Loading...</h4> : <h4 className='text-2xl font-bold'>{category.name}</h4>}
                    {products.length < 1 && <p>No product found</p>}
                </div>

                <div className='flex flex-wrap flex-row justify-center items-center'>
                    {products.map((p) => <div key={p._id} className='max-w-xs'>
                        <ProductScrollCard slug={p.slug} image={p.images[0].url} title={p.title} description={p.description} price={p.price} />

                    </div>
                    )}
                </div>

            </div>

        </div>
    </div>
  )
}

export default CategoryHome