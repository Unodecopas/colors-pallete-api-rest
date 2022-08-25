import React from 'react'
import styles from './styles.module.css'
const ColorList = ({ myColors, selectedColor, setSelectedColor }) => {
  const handleClick = (index) => {
    setSelectedColor(index)
  }
  return (
    <section className={styles.colorList}>
      <ul>
        {
          myColors.colors.map((color, i) => {
            return (
              <li key={i} onClick={() => handleClick(i)}>
                <div className={selectedColor === i ? styles.colorsActive : styles.color} style={{ background: `${color}` }}>
                  {color === '' ? '+' : ''}
                </div>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}

export default ColorList
