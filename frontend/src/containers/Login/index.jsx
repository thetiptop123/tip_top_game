import React, { useEffect, useState } from "react";
import User from "../../components/Icons/User";
import Colors from "../../utils/constants/colors";

import GoogleButton from "react-google-signin-button";
import "react-google-signin-button/dist/button.css";
import FacebookLogin from "@greatsumini/react-facebook-login";
import Input from "../../components/Input";
import CreateAccountBtn from "../../components/CreateAccountBtn";
import axios from "axios";
import { ActionsTypes, useGlobal } from "../../contexts";
import { useNavigate } from "react-router-dom";

import styles from "../../styles/Login/Login.module.css";
import { isMobile } from "react-device-detect";

export default function Login() {
  const [states, dispatch] = useGlobal();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Si l'utilisateur est déjà connecté, rediriger par défaut vers son profil
  useEffect(() => {
    if (states.token.length > 0) {
      navigate("/profile");
    }
  }, [states.token, navigate]);

  const handleSignin = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, { 
        email,
        password,
      })
      .then((res) => {
        console.log("res => ", res);
        if (res.data?.token) {
          // Mettre à jour le contexte global avec les infos de l'utilisateur connecté
          dispatch({
            type: ActionsTypes.UPDATE,
            props: {
              email,
              token: res.data?.token,
              phone: res.data?.user.phone,
              firstname: res.data?.user.userName.split(' ')[0],
              lastname: res.data?.user.userName.split(' ')[1],
              // Vous pouvez aussi ajouter le userType si besoin :
              userType: res.data?.user.userType,
            },
          });
          // Redirection en fonction du type d'utilisateur
          if (res.data?.user.userType === "admin") {
            // Si l'utilisateur est admin, rediriger vers le dashboard
            navigate("/dashboard/users");
          } else {
            // Sinon, rediriger vers le profil
            navigate("/profile");
          }
        }
      })
      .catch((error) => {
        console.error("Error =>", error.response ? error.response.data : error.message);
      });
  };

  return (
    <div className={styles.body}>
      <div className={styles.leftPartContainer}>
        <div
          className={styles.title}
          style={{
            color: Colors.darkGreen,
          }}
        >
          Thé Tip Top Un thé bio.. Un geste pour la planète..
        </div>
        <div
          className={styles.text}
          style={{
            backgroundColor: Colors.gray,
          }}
        >
          <p>
            The Tip Top vous propose un jeu-concours pour vous fidéliser et
            répondre à vos éventuels besoins, et vous faire découvrir ses
            différentes gammes de thé de très grande qualité, elle est parmi les
            leaders dans le domaine. À vous de tenter votre chance.
          </p>
          <p style={{ color: Colors.darkGreen, fontWeight: 700 }}>
            Lire la suite...
          </p>
        </div>
        <div
          className={styles.testimonialsContainer}
          style={{
            backgroundColor: Colors.gray,
          }}
        >
          <div
            className={styles.testimonialsTitle}
            style={{
              color: Colors.darkGreen,
            }}
          >
            Témoignages
          </div>
          <div>
            <div className={styles.testimonialsSubContainer}>
              <div
                className={styles.iconContainer}
                style={{
                  backgroundColor: Colors.lightGreen,
                }}
              >
                <User />
              </div>
              <div className={styles.testimonialsText}>
                <div
                  className={styles.text2}
                  style={{
                    color: Colors.darkGreen,
                  }}
                >
                  Théo Sabatier
                </div>
                <div className={styles.text3}>
                  Thé tip top, très bonne qualité, bon service, rien à
                  recommander, je recommande fortement.
                </div>
              </div>
            </div>
            <div className={styles.testimonialsSubContainer}>
              <div
                className={styles.iconContainer}
                style={{
                  backgroundColor: Colors.lightGreen,
                }}
              >
                <User />
              </div>
              <div className={styles.testimonialsText}>
                <div
                  className={styles.text2}
                  style={{
                    color: Colors.darkGreen,
                  }}
                >
                  Amal Siraj
                </div>
                <div className={styles.text3}>
                  Thé tip top, très bonne qualité, bon service, rien à
                  recommander, je recommande fortement.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightPartContainer}>
        <div
          className={styles.rightPartSubContainer}
          style={{
            backgroundColor: Colors.lightGreen,
          }}
        >
          <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <Input
                width={isMobile ? 300 : 473}
                height={56}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="Adresse mail..."
              />
              <Input
                width={isMobile ? 300 : 473}
                height={56}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Mot de passe..."
              />
            </div>
            <div>
              <CreateAccountBtn onClick={() => handleSignin()}>
                Connexion
              </CreateAccountBtn>
            </div>
          </div>
          <div style={{ color: Colors.white, paddingLeft: 20 }}>
            Pas de compte ?{" "}
            <a
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => navigate("/signup")}
            >
              Inscrivez-vous
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
