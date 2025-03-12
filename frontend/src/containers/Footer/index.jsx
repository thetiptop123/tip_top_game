import React from 'react';
import Item from "../../components/Item";
import Colors from "../../utils/constants/colors";

export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: Colors.theTipTop,
        height: 95,
        color: Colors.gray,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: 20,
          width: "30%",
          paddingLeft: 30,
        }}
      >
        <Item>
          <img src="/logo.png" width={39} height={41} />
        </Item>
        <Item>Contact</Item>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "40%",
        }}
      >
        <Item>
          Thé Tip Top - Agence Furious Ducks - Tous Droits Réservés 2024 - Ceci est un site fictif
        </Item>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "30%",
        }}
      >
        <Item>Suivez-nous</Item>
        <Item>Thé Tip Top</Item>
        <Item>Règles du jeu</Item>
      </div>
    </div>
  );
}
