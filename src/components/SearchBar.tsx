import { useEffect, useState } from "react"
import { IoSearch } from "react-icons/io5"

interface SearchProps {
    searchText: string,
    setSearchText: (text:string) => void
}

export default function SearchBar({searchText, setSearchText}: SearchProps) {
    const [inputText, setInputText] = useState('')

    // console.log(searchText)
    useEffect(() => {
        const searchTimeOut = setTimeout(() => setSearchText(inputText), 500)

        return () => clearTimeout(searchTimeOut)
    }, [inputText, setInputText])

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