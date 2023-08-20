import React, {useEffect} from 'react'
import Multiselect from 'multiselect-react-dropdown';

const ProductCreateForm = ({handleSubmit, handleChange, values, handleCategoryChange, showSub, subOptions, setValues, setShowSub, selectedSubs, setSelectedSubs, brandObjects}) => {

  const {title, description, price, quantity, colors, categories, genders, sizes} = values;


  useEffect(() => {
    setValues({...values, subs: selectedSubs});
  }, [selectedSubs])

  const handleSelect = (selectedList, selectedItem) => {
    // console.log('SELECTED---',selectedItem);
    setSelectedSubs(prevItems => {
      return [...prevItems, selectedItem._id];
    });
    // setValues({...values, subs: selectedSubs});
  }
  const handleRemove = (selectedList, removedItem) => {
    // console.log('REMOVED---',removedItem);
    setSelectedSubs((prevItems) => {
      return prevItems.filter(
          (item) => {
            console.log('Hello -- ', item, removedItem._id);
            return item !== removedItem._id;
          }
      )
    });
    setValues({...values, subs: selectedSubs});
  }

// sr-only
  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md my-2">
          <label className="">Title</label>
          <input onChange={handleChange} name="title" value={title} type="text" placeholder="Title" required className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" />
      </div>
      <div className="rounded-md my-2">
          <label className="">Description</label>
          <input onChange={handleChange} name="description" value={description} type="text" placeholder="Description" required className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" />
      </div>
      <div className="rounded-md my-2">
          <label className="">Price</label>
          <input onChange={handleChange} name="price" value={price} type="number" placeholder="Price" required className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" />
      </div>
      <div className="rounded-md my-2">
        <label className="">Shipping</label>
        <select name="shipping" onChange={handleChange} className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm' >
            <option>Please Select</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="rounded-md my-2">
          <label className="">Quantity</label>
          <input onChange={handleChange} name="quantity" value={quantity} type="number" placeholder="Quantity" required className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" />
      </div>
      <div className="rounded-md my-2">
        <label  className="">Gender</label>
        <select name="gender" onChange={handleChange} className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm' >
            <option>Please Select</option>
            {genders.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="rounded-md my-2">
        <label  className="">Color</label>
        <select name="color" onChange={handleChange} className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm' >
            <option>Please Select</option>
            {colors.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="rounded-md my-2">
        <label  className="">Size</label>
        <select name="size" onChange={handleChange} className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm' >
            <option>Please Select</option>
            {sizes.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="rounded-md my-2">
        <label  className="">Brand</label>
        <select name="brand" onChange={handleChange} className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm' >
            <option>Please Select</option>
            {brandObjects.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
        </select>
      </div>
      <div className="rounded-md my-2">
        <label  className="">Category</label>
        <select name="category" onChange={handleCategoryChange} className='relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm' >
            <option>Please Select</option>
            {categories.length > 0 && categories.map((c) => <option key={c._id} value={c._id}> {c.name} </option>)}
        </select>
      </div>
      <div className="rounded-md my-2">
        <label  className="">Sub Categories</label>
        
        <Multiselect
          options={subOptions} // Options to display in the dropdown
          // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
          onSelect={handleSelect} // Function will trigger on select event
          onRemove={handleRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />
      </div>
      <div>
        <button type="submit" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700">
          Save
        </button>
      </div>
    </form>
  )
}

export default ProductCreateForm