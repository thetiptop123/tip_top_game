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
        <img src="/image1_home.png" width={1052} height={252} />
      </div>
      <div>
        <GoGameButton goTo="profile">Commencer le jeu</GoGameButton>
      </div>
      <div style={{ width: 825 }}>
        The Tip Top vous propose un jeu-concours pour vous fediliser et répondre
        à vos eventuels besoin, et vous faire découvrire ses différentes gammes
        de thé de très grande qualité, elle est parmi les leaders dans le
        domaine. à vous de tenter votre chance.
      </div>
    </Container>
  );
}
