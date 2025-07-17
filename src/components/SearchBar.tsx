import { useEffect, useState } from "react"
import { IoSearch } from "react-icons/io5"
import { useDebounce } from "../hooks/useDebounce"

interface SearchProps {
    searchText: string,
    setSearchText: (text:string) => void
}

export default function SearchBar({searchText, setSearchText}: SearchProps) {
    const [inputText, setInputText] = useState('')
    const debounced = useDebounce(inputText, 500)

    
    useEffect(() => {
        setSearchText(debounced)
    }, [debounced, setSearchText])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setInputText(e.target.value)
    }
    
    return <>
        <div className="input-wrap">
            <IoSearch />
            <input 
                type="text"
                placeholder="Movies titles"
                onChange={handleChange}
            />
            <button>Search</button>
        </div>
    </>
}