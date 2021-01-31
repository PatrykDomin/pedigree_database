import React from 'react';
import useStyles from './Information.style';
import Nela from '../../images/Nela.jpg';
import Dogs from '../../images/dogs_older_s.jpg';

export const Information: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.information}>
      <div className={styles.row}>
        <div className={styles.content}>
          <h2>Czym jest baza rodowodowa?</h2>
          <p>
            Baza rodowodowa to system, dzięki któremu hodowcy jak i przyszli
            właściciele psów mogą sprawdzić informacje na temat interesujących
            ich psów, czy też hodowli. Można prześledzić drzewo genealogiczne
            wybranego psa, zobaczyć jego mioty, osiągnięcia, czy też aktualne
            badania. System jest intuicyjny w obsłudze oraz stawia na prostotę
            działania z minimalną ilością danych potrzebnych do jego
            funkcjonowania.
          </p>
        </div>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${Nela})` }}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.content}>
          <h2>Czym jest hodowla?</h2>
          <p>
            Pytanie proste, a zarazem trudne. Najlepiej przytoczyć informacje na
            temat tego jaki jest jej cel, aby móc to pojęcie lepiej zrozumieć.
            Celem hodowli oraz jej prowadzenie już takie proste nie są. Samym
            celem hodowli jest utrzymanie jak najzdrowszych i najsilniejszych
            fizycznych, psychicznych, jak i użytkowych cech w danej rasie. A co
            za tym idzie, szukanie jak najlepszych reproduktorów czy też suk
            hodowlanych, dobrze dobranych do danego psa, aby wymienione cechy
            były jak najsilniejsze.
          </p>
        </div>
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${Dogs})` }}
        />
      </div>
    </div>
  );
};
