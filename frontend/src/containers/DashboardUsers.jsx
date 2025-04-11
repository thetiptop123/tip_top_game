// src/containers/DashboardUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobal } from "../contexts"; // Votre contexte global
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DashboardUsers() {
  const [states] = useGlobal(); // On récupère le token et potentiellement d'autres infos
  const [users, setUsers] = useState([]); // État pour stocker la liste des utilisateurs
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fonction pour récupérer les utilisateurs
  const fetchUsers = async () => {
    try {
      // Si vous avez un token global, on l'ajoute dans le header Authorization
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/allusers`, {
        headers: {
          Authorization: `Bearer ${states.token}`,
        },
      });
      if (response.data?.success) {
        // On stocke la liste des utilisateurs dans l'état
        setUsers(response.data.users);
      } else {
        toast.error("Erreur lors de la récupération des utilisateurs.");
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à /allusers:", error.response ? error.response.data : error.message);
      toast.error("Erreur lors de l'appel API.");
      // Optionnel : rediriger si l'accès est refusé
      if (error.response && error.response.status === 403) {
        navigate("/profile");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Vérifiez que l'utilisateur est connecté
    if (!states.token) {
      toast.error("Vous devez être connecté en tant qu'administrateur pour accéder à cette page.");
      navigate("/login");
    } else {
      // Vous pouvez ajouter ici une vérification du type d'utilisateur si vous le stockez dans le contexte
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states.token]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard Admin : Tous les Utilisateurs</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          {users && users.length > 0 ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={styles.th}>Nom</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Téléphone</th>
                  <th style={styles.th}>Adresse</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} style={styles.tr}>
                    <td style={styles.td}>{user.userName}</td>
                    <td style={styles.td}>{user.email}</td>
                    <td style={styles.td}>{user.userType}</td>
                    <td style={styles.td}>{user.phone}</td>
                    <td style={styles.td}>{user.address.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Aucun utilisateur trouvé.</p>
          )}
        </>
      )}
    </div>
  );
}

// Quelques styles en ligne pour simplifier la lecture
const styles = {
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  tr: {
    textAlign: "left",
  },
};
