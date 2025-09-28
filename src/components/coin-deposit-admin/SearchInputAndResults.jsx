import React, { useState } from 'react'
import Input from '../Input'
import { Search } from 'lucide-react'

const SearchInputAndResults = () => {
    const [SearchParam, setSearchParam] = useState('')
  return (
    <div className='p-5'>
        <Input
            icon={Search}
            placeholder='Enter Username to find users'
            value={SearchParam}
            handleChange={(e)=>e.target.value}
            type='text'
        />
    </div>
  )
}

export default SearchInputAndResults