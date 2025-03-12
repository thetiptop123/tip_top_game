import React from 'react';
import Colors from "../../utils/constants/colors";

const Legalites = () => {
  return (
    <div style={{ marginLeft: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
        <h2 id="Conditions" style={{ fontWeight: 800, fontSize: 20, color: Colors.darkGreen }}>1. Mentions légales</h2>
        <p style={{ marginBottom: 0 }}>Article 1 - Présentation de l'entreprise</p>
        <ul style={{ marginTop: 0 }}>
          <li>Notre entreprise TIPTOP est spécialisée dans la vente de thés haut de gamme, offrant une large gamme de thés issus de différentes régions du monde, adaptés à tous les goûts et toutes les préférences.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>Article 2 - Acceptation des CGU</p>
        <ul style={{ marginTop: 0 }}>
          <li>L’utilisation du site web Thé Tip Top implique l'acceptation intégrale des présentes Conditions Générales d'Utilisation (CGU). En cas de désaccord avec une quelconque disposition, vous devez vous abstenir d'utiliser notre site.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>Article 3 - Modification des CGU</p>
        <ul style={{ marginTop: 0 }}>
          <li>Nous nous réservons le droit de modifier à tout moment et sans préavis ces CGU afin de les adapter à l'évolution du site et de ses fonctionnalités. Les CGU en vigueur sont celles appliquées au moment de l'utilisation du site.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>Article 4 - Description du service</p>
        <ul style={{ marginTop: 0 }}>
          <li>Le site TipTop présente notre entreprise, propose notre catalogue de produits en ligne et permet la passation de commandes. Nous nous engageons à actualiser régulièrement les informations, mais nous ne garantissons pas l'exhaustivité ou l'exactitude des contenus.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>Article 5 - Inscription et gestion du compte</p>
        <ul style={{ marginTop: 0 }}>
          <li>La création d'un compte est nécessaire pour passer commande sur notre site. Les utilisateurs sont responsables de la confidentialité de leurs identifiants et de l’utilisation de leur compte. Tout usage non autorisé doit être signalé immédiatement.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>Article 6 - Commande et paiement</p>
        <ul style={{ marginTop: 0 }}>
          <li>Les paiements se font en ligne via carte bancaire ou virement. Nous nous réservons le droit de refuser une commande si un litige avec le client existe.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>Article 7 - Livraison</p>
        <ul style={{ marginTop: 0 }}>
          <li>Les produits sont livrés à l’adresse fournie lors de la commande. Nous ne sommes pas responsables des retards de livraison dus aux transporteurs.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>Article 8 - Droit de rétractation</p>
        <ul style={{ marginTop: 0 }}>
          <li>Conformément à la loi, le client dispose d'un délai de 14 jours pour exercer son droit de rétractation à compter de la réception de sa commande.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>Article 9 - Hébergeur</p>
        <ul style={{ marginTop: 0 }}>
          <li>Le site est hébergé par OVHcloud, Société anonyme au capital de 190 540 425€ Siège social : 2 rue Kellermann, 59100 Roubaix 537 407 926 R.C.S. Lille Métropole.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>Article 10 - Liens hypertextes</p>
        <ul style={{ marginTop: 0 }}>
          <li>Les liens hypertextes présents sur le site renvoyant vers des sites externes n’engagent pas la responsabilité de TIPTOP.</li>
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
        <h2 id="Politiques" style={{ fontWeight: 800, fontSize: 20, color: Colors.darkGreen }}>2. Politique de confidentialité et protection des données</h2>
        <p style={{ marginBottom: 0 }}>Article 1 - Collecte des données</p>
        <ul style={{ marginTop: 0 }}>
          <li>Nous collectons des données personnelles dans le cadre des commandes, des inscriptions aux newsletters et des comptes utilisateurs.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>Article 2 - Utilisation des données</p>
        <ul style={{ marginTop: 0 }}>
          <li>Les données collectées sont utilisées pour traiter les commandes, fournir des services et personnaliser l’expérience utilisateur.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>Article 3 - Partage des données</p>
        <ul style={{ marginTop: 0 }}>
          <li>Les données peuvent être partagées avec des prestataires tiers (livraison, paiement) pour assurer le bon déroulement des commandes.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>Article 4 - Droit d'accès et de rectification</p>
        <ul style={{ marginTop: 0 }}>
          <li>Conformément à la loi informatique et libertés, vous avez un droit d’accès, de rectification et de suppression des données vous concernant.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>Article 5 - Cookies</p>
        <ul style={{ marginTop: 0 }}>
          <li>Le site utilise des cookies pour améliorer la navigation et analyser le trafic. Vous pouvez configurer votre navigateur pour refuser les cookies.</li>
        </ul>
      </div>
    </div>
  );
};

export default Legalites;