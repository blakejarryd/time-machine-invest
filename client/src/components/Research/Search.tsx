import { useState, useEffect } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import BusinessIcon from '@mui/icons-material/Business';

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
      <TextField
        id="input-with-icon-textfield"
        label="Company Filter"
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BusinessIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </>
  )
}

export default Search