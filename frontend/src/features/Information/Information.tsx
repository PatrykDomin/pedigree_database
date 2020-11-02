import React from 'react'
import useStyles from './Information.style'
import Nela from '../../images/Nela.jpg'
import Dogs from '../../images/dogs_older_s.jpg'

export const Information: React.FC = () => {
  const styles = useStyles()
  return (
    <div className={styles.information}>
      <div className={styles.row}>
        <div className={styles.content}>
          <h2>Czym jest baza rodowodowa?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            dolorum eos iste ipsa quam, fugit aut architecto placeat iure odit
            hic repudiandae consectetur alias molestias perspiciatis dolores
            quibusdam quis! Earum. Quos porro, alias, provident necessitatibus
            voluptates sunt officiis doloribus sint iste quod dolore eos
            reprehenderit illum. Eveniet ea eos natus, rem modi aut accusantium
            quisquam sed voluptatibus qui, non tenetur! Temporibus possimus,
            explicabo illum in similique enim tempore placeat. Eum nostrum
            obcaecati harum delectus consectetur error, dignissimos ipsum.
            Mollitia vero quidem numquam minima iusto vel dolores officia
            inventore quod a. Assumenda explicabo saepe porro sed voluptatibus
            quis similique repellat soluta quia sit tempora minima omnis, quae
            cumque earum maiores amet molestiae? Ratione mollitia eligendi
            magnam debitis optio ex suscipit asperiores.
          </p>
        </div>
        <img src={Nela} alt="Nela" />
      </div>
      <div className={styles.row}>
        <div className={styles.content}>
          <h2>Czym jest hodowla?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt
            dolorum eos iste ipsa quam, fugit aut architecto placeat iure odit
            hic repudiandae consectetur alias molestias perspiciatis dolores
            quibusdam quis! Earum. Quos porro, alias, provident necessitatibus
            voluptates sunt officiis doloribus sint iste quod dolore eos
            reprehenderit illum. Eveniet ea eos natus, rem modi aut accusantium
            quisquam sed voluptatibus qui, non tenetur! Temporibus possimus,
            explicabo illum in similique enim tempore placeat. Eum nostrum
            obcaecati harum delectus consectetur error, dignissimos ipsum.
            Mollitia vero quidem numquam minima iusto vel dolores officia
            inventore quod a. Assumenda explicabo saepe porro sed voluptatibus
            quis similique repellat soluta quia sit tempora minima omnis, quae
            cumque earum maiores amet molestiae? Ratione mollitia eligendi
            magnam debitis optio ex suscipit asperiores.
          </p>
        </div>
        <img src={Dogs} alt="dogs" />
      </div>
    </div>
  )
}
