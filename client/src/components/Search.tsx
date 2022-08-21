import { FC, useState, useEffect } from 'react'
import { Shares } from '../models/models'
import { Link } from "react-router-dom";

interface SearchProps {
  filterShares: (input: string) => void
}

const Search = ({filterShares}: SearchProps) => {
  const [input, setInput] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  useEffect(() => {
    filterShares(input)
  }, [input])

  return (
    <>
      <form>
        <label>Share Search</label>
        <input type="text" value={input} onChange={handleChange}></input>
      </form>
    </>
  )
}

export default Search