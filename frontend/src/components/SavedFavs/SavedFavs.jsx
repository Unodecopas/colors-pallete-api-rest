import React from 'react'
import bin from '../../assets/bin.svg'
import styles from './styles.module.css'
const SavedFavs = ({ favorites, deleteFavorite, setSelectedFav }) => {
  const handleFav = (fav) => {
    setSelectedFav(fav)
  }
  return (
    <section className={styles.savedFavs}>
      <h2>Saved palletes</h2>
      <ul>
        {
          favorites.map((fav) => {
            return (
              <li key={fav.id} >
              <div className={styles.title}>
                <p>{fav.name}</p>
                <button onClick={() => deleteFavorite(fav.id)}>
                  <img src={bin} alt="icon delete" />
                </button>
              </div>
              <div className={styles.colorsFav} onClick={() => handleFav(fav)}>
                <ol>
                  {
                    fav.colors.map((favColor, i) => {
                      return (
                        <li key={i}>
                          <div className={styles.color} style={{ background: `${favColor}` }}></div>
                        </li>
                      )
                    })
                  }
                </ol>
              </div>
              </li>
            )
          })
        }
      </ul>
    </section>
  )
}

export default SavedFavs
