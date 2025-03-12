import React from "react";
import Container from "../../components/Container";
import GoGameButton from "../../components/GameButton";
import styles from "../../styles/Home/Home.module.css";

const Lots = () => {
  const imagesName = [
    "lot1.jpg",
    "lot2.jpg",
    "Lot3.jpg",
    "Lot4.jpg",
    "Lot5.jpg",
  ];
  const altName = ["Lot 1", "Lot 2", "Lot 3", "Lot 4", "Lot 5"];
  const imagesLabel = [
    "Lot 1 : Infuseur à thé",
    " Lot 2 : Boite de 100g d'un thé détox ou d'infusion",
    "Lot 3 : Boite de 100g d'un thé signature",
    "Lot 4 : Coffret découverte d'une valeur de 39€",
    "Lot 5 : Coffret découverte d'une valeur de 69€",
  ];

  const lotsComponents = imagesName.map((el, i) => {
    return (
      <div className={styles.lotsSubContainer} key={i}>
        <img src={el} alt={altName[i]} className={styles.lotsImage} />
        <p className={styles.lotsText}>{imagesLabel[i]}</p>
      </div>
    );
  });

  return (
    <div>
      <h2 style={{ paddingLeft: 10, fontWeight: 700, fontSize: 25 }}>
        Découvrez les lots à gagner
      </h2>
      <div className={styles.lotsContainer}>{lotsComponents}</div>
    </div>
  );
};

export default function Home() {
  return (
    <Container className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Participez au jeu-concours Thé Tip Top 100 % gagnant avec différents
          cadeaux exclusivement réservés pour vous!
        </h1>
        <img src="/img_home.png" alt="jeu-concours" className={styles.image} />
        <div className={styles.text}>
          The Tip Top vous propose un jeu-concours pour vous fidéliser et
          répondre à vos éventuels besoins, et vous faire découvrir ses
          différentes gammes de thé de très grande qualité. Elle est parmi les
          leaders dans le domaine. À vous de tenter votre chance.
        </div>
        <div className={styles.btnContainer}>
          <GoGameButton goTo="profile">Accéder au jeu</GoGameButton>
        </div>
        <Lots />
      </div>
    </Container>
  );
}
