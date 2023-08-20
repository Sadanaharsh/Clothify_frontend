import React from 'react'

const CategoryForm = ({ handleSubmit, name, setName }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="remember" value="true" />
      <div className="rounded-md shadow-sm my-2">
        <div>
          <label className="sr-only">Filter</label>
          <input onChange={(e) => setName(e.target.value)} name="name" value={name} type="text" required autoFocus={true} className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Name" />
        </div>
      </div>
      <div>
        <button type="submit" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-blue-600 hover:bg-blue-700">
          Save
        </button>
      </div>
    </form>
  )
}

export default CategoryForm