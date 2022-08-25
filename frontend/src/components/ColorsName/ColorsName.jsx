import React, { useState } from 'react'
import styles from './styles.module.css'
const ColorsName = ({ myColors, setMyColors, favorites, setFavorites }) => {
  const [error, setError] = useState('')
  const handleForm = async (e) => {
    e.preventDefault()
    if (myColors.name !== '') {
      await fetch('http://localhost:4000/colors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myColors)
      })
      setFavorites([...favorites, myColors])
    } else {
      setError('Name is required')
    }
  }
  return (
    <form className={styles.colorsName} onSubmit={handleForm}>
        <label htmlFor="name">Name</label>
        <div className={styles.inputs}>
        <input type="text" id='name' placeholder={error || ''} value={myColors.name} onChange={e => setMyColors({ name: e.target.value, colors: myColors.colors }) } />
        <button>+</button>
        </div>
    </form>
  )
}

export default ColorsName
