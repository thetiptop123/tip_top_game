import React from 'react';


export default function Footer() {
  return (
    <footer>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: '#39590A',
        padding: '20px',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center' }}>
          <img src="logo.png" alt="Thé Tip Top" width={40} height={40} />
        </div>

        {/* Contact */}
        <div style={{ textAlign: 'left', color: '#fff' }}>
          <h3 style={{ color: '#85db18' }}>Contact</h3>
          <p>Email : <a href="mailto:contact@thetiptop.com" style={{ color: '#ffdb4f', textDecoration: 'none' }}>contact@thetiptop.com</a></p>
          <p>Téléphone : +33 1 23 45 67 89</p>
          <p>Adresse : 10 Rue de Nice, 06000 Nice</p>
        </div>

        {/* Réseaux Sociaux */}
        <div style={{ textAlign: 'left', color: '#fff' }}>
          <h3 style={{ color: '#85db18' }}>Suivez-nous</h3>
          <a href="https://www.facebook.com/" style={{ color: '#ffdb4f', textDecoration: 'none' }}><i className="fab fa-facebook"></i> Facebook</a><br />
          <a href="https://www.instagram.com/thetiptop25/?hl=fr/" style={{ color: '#ffdb4f', textDecoration: 'none' }}><i className="fab fa-instagram"></i> Instagram</a><br />
          <a href="#" style={{ color: '#ffdb4f', textDecoration: 'none' }}><i className="fab fa-twitter"></i> TikTok</a>
        </div>

        {/* Navigation */}
        <div style={{ textAlign: 'left', color: '#fff' }}>
          <h3 style={{ color: '#85db18' }}>Navigation</h3>
          <p><a href="/game" style={{ color: '#ffffff', textDecoration: 'none' }}>Espace de jeu</a></p>
          <p><a href="/rules" style={{ color: '#ffffff', textDecoration: 'none' }}>Règles du jeu</a></p>
          <p><a href="/profile" style={{ color: '#ffffff', textDecoration: 'none' }}>Espace Client</a></p>
          <p><a href="/login" style={{ color: '#ffffff', textDecoration: 'none' }}>Se connecter</a></p>
          <p><a href="/contact" style={{ color: '#ffffff', textDecoration: 'none' }}>Formulaire de contact</a></p>
        </div>

        {/* Mentions Légales */}
        <div style={{ textAlign: 'left', color: '#fff' }}>
          <h3 style={{ color: '#85db18' }}>Mentions Légales</h3>
          <p><a href="legalites#conditions" style={{ color: '#ffdb4f', textDecoration: 'none' }}>Conditions Générales</a></p>
          <p><a href="legalites#politiques" style={{ color: '#ffdb4f', textDecoration: 'none' }}>Politique de Confidentialité</a></p>
        </div>

        {/* Newsletter */}
        <div style={{ textAlign: 'left', color: '#fff' }}>
          <h3 style={{ color: '#85db18' }}>Newsletter</h3>
          <p>Abonnez-vous pour recevoir nos offres exclusives :</p>
          <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <input type="email" placeholder="Votre adresse email" required style={{ padding: '10px', marginBottom: '10px', width: '100%' }} />
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', width: '100%' }}>S'abonner à la Newsletter</button>
          </form>
        </div>

      </div>
      
      <div style={{
        textAlign: 'center',
        backgroundColor: '#e0e0e0',
        padding: '10px',
        color: '#000',
      }}>
        <p>&copy; 2025 Thé Tip Top - Agence Furious Ducks - Ceci est un site fictif. Projet étudiant</p>
      </div>
    </footer>
  );
}