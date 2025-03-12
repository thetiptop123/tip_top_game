import React from 'react';

export default function Contact() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        gap: "50px",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#85db18",
          padding: "20px",
          borderRadius:10,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "600px",
          height : "100%",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333",display:"flex", justifyContent:"center" }}>CONTACTEZ-NOUS !</h2>
        <form method="post" style={{marginLeft:10}}>
          <div style={{ marginBottom: "10px" , display:"flex"}}>
            <label htmlFor="nom" style={{ display: "block", marginBottom: "5px", fontWeight: "bold", marginRight:15 }}>Nom:</label>
            <input type="text" id="nom" name="nom" style={{ width: "50%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
          </div>
          <div style={{ marginBottom: "10px", display:"flex" }}>
            <label htmlFor="adresse_mail" style={{ display: "block", marginBottom: "5px", fontWeight: "bold", marginRight:12  }}>Email:</label>
            <input type="email" id="adresse_mail" name="adresse_mail" required style={{ width: "50%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="message" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Message:</label>
            <textarea id="message" name="message" rows="15" required style={{ width: "90%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", resize: "vertical" }}></textarea>
          </div>
          <button type="submit" style={{backgroundColor: "#39590A",color: "white",padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer",}} onMouseOver={(e) => e.target.style.backgroundColor = "#ffdb4f"} onMouseOut={(e) => e.target.style.backgroundColor = "#39590A"}>
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}