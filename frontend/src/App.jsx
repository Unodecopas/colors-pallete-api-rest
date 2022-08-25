import React, { useCallback, useEffect, useState } from 'react'
import { CompactPicker } from 'react-color'
import './App.css'
import ColorList from './components/ColorsList/ColorList'
import ColorsName from './components/ColorsName/ColorsName'
import Header from './components/Header/Header'
import SavedFavs from './components/SavedFavs/SavedFavs'

function App () {
  const [myColors, setMyColors] = useState({ name: '', colors: ['', '', '', '', ''] })
  const [selectedColor, setSelectedColor] = useState()
  const [favorites, setFavorites] = useState([])
  const [selectedFav, setSelectedFav] = useState()
  const [error, setError] = useState('')

  const getLists = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:4000/colors', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.ok) {
        const data = await res.json()
        setFavorites(data)
      } else {
        const error = await res.json()
        setError(error.message)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  const deleteFavorite = async (id) => {
    await fetch(`http://localhost:4000/colors/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        getLists()
      })
  }
  useEffect(() => {
    getLists()
  }, [])

  useEffect(() => {
    if (selectedFav) { setMyColors(selectedFav) }
  }, [selectedFav])

  const handleColor = (color) => {
    const newColor = [...myColors.colors]
    newColor[selectedColor] = color.hex
    setMyColors({ name: myColors.name, colors: newColor })
  }

  return (
    <div className="App">
      <Header />
      <main>
        {error && <p>{error}</p>}
        <ColorList myColors={myColors} setSelectedColor={setSelectedColor} selectedColor={selectedColor} />
        <div className='options'>
          <CompactPicker onChange={handleColor}/>
          <ColorsName myColors={myColors} setMyColors={setMyColors} favorites={favorites} setFavorites={setFavorites}/>
        </div>
        <SavedFavs favorites={favorites} deleteFavorite={deleteFavorite} setSelectedFav={setSelectedFav}/>
      </main>
    </div>
  )
}

export default App
