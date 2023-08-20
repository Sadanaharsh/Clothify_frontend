import React from 'react'

const LocalSearch = ({setKeyword, keyword}) => {

    const handleSearchChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
      }

  return (
    <>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm my-2">
            <div>
              <label htmlFor="categoryName" className="sr-only">Name</label>
              <input type='search' onChange={handleSearchChange} value={keyword} className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Filter categories" />
            </div>
        </div>
    </>
  )
}

export default LocalSearch