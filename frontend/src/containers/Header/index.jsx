import Item from "../../components/Item";
import Colors from "../../utils/constants/colors";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: Colors.theTipTop,
        height: 80,
        color: Colors.gray,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "10%",
          paddingLeft: 30,
          cursor: "pointer",
        }}
      >
        <Item onClick={() => navigate("/")}>
          <img src="/logo.png" width={39} height={41} />
        </Item>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "60%",
          paddingRight: 100,
        }}
      >
        <Item>
          <button
            style={{
              background: "inherit",
              border: "none",
              color: Colors.white,
              cursor: "pointer",
              fontSize: 16,
            }}
            onClick={() => navigate("/rules")}
          >
            Règles du jeu
          </button>
        </Item>
        <Item>
          <button
            style={{
              background: "inherit",
              border: "none",
              color: Colors.white,
              cursor: "pointer",
              fontSize: 16,
            }}
            onClick={() => navigate("/game")}
          >
            Jeu
          </button>
        </Item>
        <Item>
          <button
            style={{
              background: "inherit",
              border: "none",
              color: Colors.white,
              cursor: "pointer",
              fontSize: 16,
            }}
            onClick={() => navigate("/profile")}
          >
            Espace Client
          </button>
        </Item>
        <Item>
          <button
            style={{
              background: "inherit",
              border: "none",
              color: Colors.white,
              cursor: "pointer",
              fontSize: 16,
            }}
            onClick={() => navigate("/contact")}
          >
            Contact
          </button>
        </Item>
        <Item>Thé Tip Top</Item>
      </div>
    </div>
  );
}
