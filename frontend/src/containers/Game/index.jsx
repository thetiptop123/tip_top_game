import React, { useEffect, useState } from "react";
import axios from "axios";
import Input from "../../components/Input";
import Colors from "../../utils/constants/colors";
import { ActionsTypes, useGlobal } from "../../contexts";
import CreateAccountBtn from "../../components/CreateAccountBtn";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

export default function Game() {
  const [state, dispatch] = useGlobal();
  const [ticketNumber, setTicketNumber] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isWin, setIsWin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlayGame = async () => {
    setLoading(true);
    setMessageSuccess("");
    setMessageError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/game/play`,
        { ticketNumber },
        {
          headers: { Authorization: `Bearer ${state.token}` },
        }
      );

      // Assuming your backend returns { success: true, message: "Congratulations, you won ..." }
      if (response.data.success) {
        setMessageSuccess(response.data.message);
        setIsWin(true);
        // Optionally update global state with any additional info provided by the backend
        if (response.data.ticket) {
          dispatch({
            type: ActionsTypes.UPDATE,
            props: {
              ticketCode: response.data.ticket,
              prize: response.data.message,
            },
          });
        }
      } else {
        // Not expected, but just in case
        setMessageError(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessageError(error.response.data.message);
      } else {
        setMessageError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Redirect to profile if the user is not logged in
    if (!state.email) {
      navigate("/profile");
    }
  }, [state.email, navigate]);

  return (
    <>
      {isWin && (
        <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Input
            width={219}
            height={56}
            placeholder="Enter Ticket Number..."
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value)}
          />
          <CreateAccountBtn onClick={handlePlayGame}>
            {loading ? "Processing..." : "Play"}
          </CreateAccountBtn>
        </div>
        {messageSuccess && (
          <p style={{ marginTop: 20, color: Colors.lightGreen }}>
            {messageSuccess}
          </p>
        )}
        {messageError && (
          <p style={{ marginTop: 20, color: "red" }}>{messageError}</p>
        )}
      </div>
    </>
  );
}