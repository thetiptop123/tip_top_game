import React, { useState } from "react";
import User from "../../components/Icons/User";
import Colors from "../../utils/constants/colors";

import GoogleButton from "react-google-signin-button";
import "react-google-signin-button/dist/button.css";
import FacebookLogin from "@greatsumini/react-facebook-login";
import Input from "../../components/Input";
import CreateAccountBtn from "../../components/CreateAccountBtn";
import GoGameButton from "../../components/GameButton";
import axios from "axios";
import { ActionsTypes, useGlobal } from "../../contexts";

export default function Profile() {
  const [states, dispatch] = useGlobal();
  const [internalStep, setInternalStep] = useState(
    states.email.length > 0 ? 1 : 0
  );
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOneOptionSelected, setIsOneOptionSelected] = useState(false);
  const [isLoginOptionSelected, setIsLoginOptionSelected] = useState(false);

  const handleCreateAccount = () => {
    if (name !== "" && lastname !== "" && email !== "" && password !== "") {
      setInternalStep(0);
    }
    axios
      .post("http://46.202.168.187:5000/auth/register", {
        name,
        lastname,
        email,
        password,
      })
      .then((res) => {
        if (res.data?.token) {
          setInternalStep(1);
          dispatch({
            type: ActionsTypes.UPDATE,
            props: {
              firstname: name,
              lastname,
              email,
            },
          });
        }
      })
      .catch((error) => {
        console.error(
          "Error =>",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleSignin = () => {
    if (name !== "" && lastname !== "" && email !== "" && password !== "") {
      setInternalStep(0);
    }
    axios
      .post("http://46.202.168.187:5000/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data?.token) {
          setInternalStep(1);
          dispatch({
            type: ActionsTypes.UPDATE,
            props: {
              email,
            },
          });
        }
      })
      .catch((error) => {
        console.error(
          "Error =>",
          error.response ? error.response.data : error.message
        );
      });
  };

  return internalStep === 0 ? (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "50%",
          height: "90vh",
          paddingLeft: 55,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: Colors.darkGreen,
            fontSize: 22,
            fontWeight: 900,
            height: 60,
            width: 426,
          }}
        >
          Thé Tip Top Un thé bio.. Un geste pour la planète..
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignContent: "center",
            width: 597,
            height: 236,
            backgroundColor: Colors.gray,
            borderRadius: 10,
            fontSize: 20,
            padding: 20,
          }}
        >
          <p>
            The Tip Top vous propose un jeu-concours pour vous fediliser et
            répondre à vos eventuels besoin, et vous faire découvrire ses
            différentes gammes de thé de très grande qualité, elle est parmi les
            leaders dans le domaine. à vous de tenter votre chance.
          </p>
          <p style={{ color: Colors.darkGreen, fontWeight: 700 }}>
            Lire la suite...
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignContent: "center",
            width: 597,
            height: 236,
            backgroundColor: Colors.gray,
            borderRadius: 10,
            fontSize: 20,
            padding: 20,
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: Colors.darkGreen,
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            Témoignages
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: 80,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.lightGreen,
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                }}
              >
                <User />
              </div>
              <div style={{ width: "80%" }}>
                <div
                  style={{
                    color: Colors.darkGreen,
                    fontSize: 14,
                    fontWeight: 900,
                  }}
                >
                  Théo Sabatier
                </div>
                <div style={{ fontSize: 13 }}>
                  Thé tip top, très bonne qualité, bon serviec, rien à
                  recomander, je recomende fortement.
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: 80,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.lightGreen,
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                }}
              >
                <User />
              </div>
              <div style={{ width: "80%" }}>
                <div
                  style={{
                    color: Colors.darkGreen,
                    fontSize: 14,
                    fontWeight: 900,
                  }}
                >
                  Amal Siraj
                </div>
                <div style={{ fontSize: 13 }}>
                  Thé tip top, très bonne qualité, bon serviec, rien à
                  recomander, je recomende fortement.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          height: "100vh",
        }}
      >
        {!isOneOptionSelected ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <CreateAccountBtn
              onClick={() => {
                setIsOneOptionSelected(true);
                setIsLoginOptionSelected(true);
              }}
            >
              Connexion
            </CreateAccountBtn>
            <CreateAccountBtn
              onClick={() => {
                setIsOneOptionSelected(true);
                setIsLoginOptionSelected(false);
              }}
            >
              Inscription
            </CreateAccountBtn>
          </div>
        ) : isLoginOptionSelected ? (
          <div
            style={{
              backgroundColor: Colors.lightGreen,
              width: 531,
              height: 650,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
                height: "30%",
              }}
            >
              <GoogleButton
                label="Connexion avec Google"
                onClick={() => {
                  console.log("Google button clicked");
                }}
              />
              <FacebookLogin
                appId="1088597931155576"
                onSuccess={(response) => {
                  console.log("Login Success!", response);
                }}
                onFail={(error) => {
                  console.log("Login Failed!", error);
                }}
                onProfileSuccess={(response) => {
                  console.log("Get Profile Success!", response);
                }}
                style={{
                  backgroundColor: "#4267b2",
                  color: "#fff",
                  fontSize: "16px",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                height: "50%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <Input
                  width={473}
                  height={56}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Adresse mail..."
                />
                <Input
                  width={473}
                  height={56}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Mot de passe..."
                />
              </div>
              <div>
                <CreateAccountBtn onClick={() => handleSignin()}>
                  Connexion
                </CreateAccountBtn>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: Colors.lightGreen,
              width: 531,
              height: 650,
              borderRadius: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 20,
                height: "30%",
              }}
            >
              <GoogleButton
                label="Connexion avec Google"
                onClick={() => {
                  console.log("Google button clicked");
                }}
              />
              <FacebookLogin
                appId="1088597931155576"
                onSuccess={(response) => {
                  console.log("Login Success!", response);
                }}
                onFail={(error) => {
                  console.log("Login Failed!", error);
                }}
                onProfileSuccess={(response) => {
                  console.log("Get Profile Success!", response);
                }}
                style={{
                  backgroundColor: "#4267b2",
                  color: "#fff",
                  fontSize: "16px",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "4px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: Colors.white,
                fontSize: 20,
                fontWeight: 700,
                height: "10%",
              }}
            >
              OU
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                height: "50%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Input
                    width={219}
                    height={56}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="Nom..."
                  />
                  <Input
                    width={219}
                    height={56}
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                    placeholder="Prénom..."
                  />
                </div>
                <Input
                  width={473}
                  height={56}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Adresse mail..."
                />
                <Input
                  width={473}
                  height={56}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Mot de passe..."
                />
              </div>
              <div>
                <CreateAccountBtn onClick={() => handleCreateAccount()}>
                  Créer un compte
                </CreateAccountBtn>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div style={{ display: "flex", flexDirection: "column", height: "80vh" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "100%",
          height: "60%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "30%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.green,
              borderRadius: 150,
              padding: 20,
              width: 200,
              height: 200,
            }}
          >
            <User width={178} height={188} weight={1} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "60%",
            gap: 30,
          }}
        >
          <div
            style={{ fontSize: 48, fontWeight: 800, color: Colors.darkGreen }}
          >
            {states.firstname} {states.lastname}
          </div>
          <div
            style={{ fontSize: 20, fontWeight: 800, color: Colors.darkGreen }}
          >
            {states.email}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: 550,
            }}
          >
            <GoGameButton goTo="edit">Modifier mon profil</GoGameButton>
            <GoGameButton goTo="prize">Voir mes gains</GoGameButton>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "30%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "60%",
            height: "70%",
            backgroundColor: Colors.gray,
            borderRadius: 10,
            fontSize: 18,
          }}
        >
          <p style={{ width: 825, height: 75 }}>
            The Tip Top vous propose un jeu-concours pour vous fediliser et
            répondre à vos eventuels besoin, et vous faire découvrire ses
            différentes gammes de thé de très grande qualité, elle est parmi les
            leaders dans le domaine. à vous de tenter votre chance.
          </p>
        </div>
      </div>
    </div>
  );
}
