import Container from "../../components/Container";
import GoGameButton from "../../components/GameButton";

const Lots = () => (
  <div className="lots">
    <h2 style={{paddingLeft:10}}>Découvrez les lots à gagner</h2>
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    }}>
      <div className="lot" style={{
        margin: '10px',
        textAlign: 'center',
      }}>
        <img src="lot1.jpg" alt="Lot 1" style={{
          width: '150px',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '10px',
        }} />
        <p style={{
          marginTop: '10px',
          fontSize: '16px',
          color: '#333',
        }}>Lot 1 : Infuseur à thé</p>
      </div>
      <div className="lot" style={{
        margin: '10px',
        textAlign: 'center',
      }}>
        <img src="lot2.jpg" alt="Lot 2" style={{
          width: '150px',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '10px',
        }} />
        <p style={{
          marginTop: '10px',
          fontSize: '16px',
          color: '#333',
        }}>Lot 2 : Boite de 100g d’un thé détox ou d’infusion</p>
      </div>
      <div className="lot" style={{
        margin: '10px',
        textAlign: 'center',
      }}>
        <img src="lot3.jpg" alt="Lot 3" style={{
          width: '150px',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '10px',
        }} />
        <p style={{
          marginTop: '10px',
          fontSize: '16px',
          color: '#333',
        }}>Lot 3 : Boite de 100g d’un thé signature</p>
      </div>
      <div className="lot" style={{
        margin: '10px',
        textAlign: 'center',
      }}>
        <img src="lot4.jpg" alt="Lot 4" style={{
          width: '150px',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '10px',
        }} />
        <p style={{
          marginTop: '10px',
          fontSize: '16px',
          color: '#333',
        }}>Lot 4 : Coffret découverte d’une valeur de 39€</p>
      </div>
      <div className="lot" style={{
        margin: '10px',
        textAlign: 'center',
      }}>
        <img src="lot5.jpg" alt="Lot 5" style={{
          width: '150px',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '10px',
        }} />
        <p style={{
          marginTop: '10px',
          fontSize: '16px',
          color: '#333',
        }}>Lot 5 : Coffret découverte d’une valeur de 69€</p>
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <Container style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      justifyContent: "space-between",
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <center>
          <h1 style={{ color: '#39590A', fontSize: '900' }}>
            Participez au jeu-concours Thé Tip Top 100 % gagnant avec différents cadeaux exclusivement réservés pour vous!
          </h1>
        </center>
        
        <img src="/img_home.png" alt="jeu-concours" style={{ display: "flex", flexDirection: "center", marginBottom: '20px',borderRadius: '20px' }} />
        <div style={{ width: 825, textAlign: 'center', marginBottom: '20px' }}>
          The Tip Top vous propose un jeu-concours pour vous fidéliser et répondre
          à vos éventuels besoins, et vous faire découvrir ses différentes gammes
          de thé de très grande qualité. Elle est parmi les leaders dans le
          domaine. À vous de tenter votre chance.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <GoGameButton goTo="profile">Accéder au jeu</GoGameButton>
        </div>
        <Lots />
      </div>
    </Container>
  );
}