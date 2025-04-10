import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// UI & Third-Party
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleButton from "react-google-signin-button";
import "react-google-signin-button/dist/button.css";
import FacebookLogin from "@greatsumini/react-facebook-login";

// Local Components & Utils
import { ActionsTypes, useGlobal } from "../../contexts";
import Input from "../../components/Input";
import CreateAccountBtn from "../../components/CreateAccountBtn";
import Colors from "../../utils/constants/colors";
import User from "../../components/Icons/User";

// CSS & Responsiveness
import { isMobile } from "react-device-detect";
import styles from "../../styles/Signup/Signup.module.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [states, dispatch] = useGlobal();

  // Form fields state
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Optionally redirect if user is already logged in
  useEffect(() => {
    if (states.token) {
      // Optionally redirect to profile
      // navigate("/profile");
    }
  }, [states.token, navigate]);

  // ************************************************************
  //           Create Account Handler
  // ************************************************************
  const handleCreateAccount = async () => {
    // Basic client-side validation
    if (!name || !lastname || !email || !password) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // Use environment variable for API URL (adjust .env accordingly)
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          userName: `${name} ${lastname}`,
          email,
          password,
          // If needed, send googleId, facebookId, phone, address, userType, answer
        }
      );

      // Check success flag from backend (no token is sent in registration)
      if (response.data?.success) {
        toast.success("Compte créé avec succès! Redirection en cours...");
        
        // Optionally update the global state with user info
        dispatch({
          type: ActionsTypes.UPDATE,
          props: {
            firstname: name,
            lastname: lastname,
            email: email,
          },
        });
        
        // Wait 2 seconds to let the user see the toast, then redirect
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Signup Error =>", error.response ? error.response.data : error.message);

      // Check if error message contains "email already exists"
      const errorMessage = error.response?.data?.message || "";
      if (errorMessage.toLowerCase().includes("email already exists")) {
        toast.error("Cet email est déjà utilisé. Veuillez en choisir un autre ou vous connecter.");
      } else {
        toast.error("Erreur lors de la création du compte. Réessayez plus tard.");
      }
    }
  };

  // ************************************************************
  //           Render
  // ************************************************************
  return (
    <div className={styles.body}>
      {/* ToastContainer displays the toast notifications */}
      <ToastContainer />

      {/* LEFT SECTION */}
      <div className={styles.leftPartContainer}>
        <div className={styles.title} style={{ color: Colors.darkGreen }}>
          Thé Tip Top : Un thé bio... Un geste pour la planète...
        </div>

        <div className={styles.text} style={{ backgroundColor: Colors.gray }}>
          <p>
            The Tip Top vous propose un jeu-concours pour vous fidéliser et répondre à vos éventuels besoins, et vous faire découvrir ses différentes gammes de thé de très grande qualité. Elle est parmi les leaders dans le domaine. À vous de tenter votre chance.
          </p>
          <p style={{ color: Colors.darkGreen, fontWeight: 700 }}>
            Lire la suite...
          </p>
        </div>

        <div className={styles.testimonialsContainer} style={{ backgroundColor: Colors.gray }}>
          <div className={styles.testimonialsTitle} style={{ color: Colors.darkGreen }}>
            Témoignages
          </div>
          <div>
            <div className={styles.testimonialsSubContainer}>
              <div className={styles.iconContainer} style={{ backgroundColor: Colors.lightGreen }}>
                <User />
              </div>
              <div className={styles.testimonialsText}>
                <div className={styles.text2} style={{ color: Colors.darkGreen }}>
                  Théo Sabatier
                </div>
                <div className={styles.text3}>
                  Thé tip top, très bonne qualité, bon service, je recommande fortement.
                </div>
              </div>
            </div>
            <div className={styles.testimonialsSubContainer}>
              <div className={styles.iconContainer} style={{ backgroundColor: Colors.lightGreen }}>
                <User />
              </div>
              <div className={styles.testimonialsText}>
                <div className={styles.text2} style={{ color: Colors.darkGreen }}>
                  Amal Siraj
                </div>
                <div className={styles.text3}>
                  Thé tip top, très bonne qualité, bon service, je recommande fortement.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className={styles.rightPartContainer}>
        <div className={styles.rightPartSubContainer} style={{ backgroundColor: Colors.lightGreen }}>

          <div className={styles.orContainer} style={{ color: Colors.white }}>
            OU
          </div>

          <div className={styles.formContainer}>
            <div className={styles.inputContainer}>
              <div className={styles.inputSubContainer}>
                <Input
                  width={isMobile ? 300 : 219}
                  height={56}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Nom..."
                />
                <Input
                  width={isMobile ? 300 : 219}
                  height={56}
                  onChange={(e) => setLastname(e.target.value)}
                  value={lastname}
                  placeholder="Prénom..."
                />
              </div>

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
                placeholder="Mot de passe..."
                type="password"
              />
            </div>

            <div style={{ marginTop: 20 }}>
              <CreateAccountBtn onClick={handleCreateAccount}>
                Créer un compte
              </CreateAccountBtn>
            </div>
          </div>

          <div style={{ color: Colors.white, paddingLeft: 20, marginTop: 20 }}>
            Déjà un compte ?{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => navigate("/login")}>
              Connectez-vous
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
