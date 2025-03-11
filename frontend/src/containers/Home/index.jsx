import Container from "../../components/Container";
import GoGameButton from "../../components/GameButton";

export default function Home() {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        gap: 50,
      }}
    >
      <div>
        <img src="/img_home.png" width={1052} height={252} />
      </div>
      <div>
        <GoGameButton goTo="profile">Accéder au jeu</GoGameButton>
      </div>
      <div style={{ width: 825 }}>
        The Tip Top vous propose un jeu-concours pour vous fediliser et répondre
        à vos eventuels besoin, et vous faire découvrire ses différentes gammes
        de thé de très grande qualité, elle est parmi les leaders dans le
        domaine. à vous de tenter votre chance.
      </div>

      {/* Présentation des lots */}
     <div class="lots">
        <h2>Découvrez les lots à gagner</h2>
        <div class="lots-container">
            <div >
                <img src="/lot1.jpg" alt="Lot 1" />
                <p>Lot 1 : Infuseur à thé</p>
            </div>
            <div >
                <img src="/lot2.jpg" alt="Lot 2" />
                <p>Lot 2 : Boite de 100g d’un thé détox ou d’infusion</p>
            </div>
            <div >
                <img src="/Lot3.jpg" alt="Lot 3" />
                <p>Lot 3 :  Boite de 100g d’un thé signature </p>
            </div>
            <div >
                <img src="/Lot4.jpg" alt="Lot 4" />
                <p>Lot 4 :  Coffret découverte d’une valeur de 39€</p>
            </div>
            <div >
                <img src="/LOT.jpg" alt="Lot 5" />
                <p>Lot 5 : Coffret découverte d’une valeur de 69€ </p>
            </div>
        </div>
    </div>
    </Container>
  );
}
