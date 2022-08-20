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

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    
    setInput('')
  }

  return (
    <>
      <h1>Search</h1>
      <form>
        <label>Share Search</label>
        <input type="text" value={input} onChange={handleChange}></input>
      </form>
    </>
  )
}

export default Search