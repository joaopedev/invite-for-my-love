"use client";

import { useState } from "react";

type ButtonPosition = {
  top: string;
  left: string;
  right: string;
  position: "absolute" | "fixed";
};

export default function Convite() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState<ButtonPosition>({
    top: "0%",
    left: "auto",
    right: "0%",
    position: "absolute",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("La Cuchilla");

  const handleNoClickAttempt = () => {
    const randomTop = Math.floor(Math.random() * 90) + "vh";
    const randomLeft = Math.floor(Math.random() * 90) + "vw";
    setNoPos({
      top: randomTop,
      left: randomLeft,
      right: "auto",
      position: "fixed",
    });
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedRestaurant) return;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      console.error("API URL is not defined");
      return;
    }
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: selectedDate,
        restaurant: selectedRestaurant,
      }),
    });

    console.log("Email enviado com:", {
      date: selectedDate,
      restaurant: selectedRestaurant,
    });
    alert("Marcado então! 🎉");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200 text-center">
      {!accepted ? (
        <>
          <h1 className="text-4xl font-bold mb-10 text-pink-900 drop-shadow-md">
            Ei Tata, quer jantar comigo? 💕
          </h1>
          <div className="flex justify-between w-80 relative">
            <button
              onClick={() => setAccepted(true)}
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600"
            >
              Sim 💖
            </button>

            <button
              onMouseEnter={handleNoClickAttempt}
              style={{
                position: noPos.position,
                top: noPos.top,
                left: noPos.left,
                right: noPos.right,
                transition: "top 0.3s ease, left 0.3s ease",
              }}
              className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg"
            >
              Não ❌
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div className="w-96 h-56 rounded-xl shadow-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/kPa7bsKwL-c?autoplay=1"
              title="Romantic Music"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <h2 className="text-2xl font-semibold text-pink-900 drop-shadow-sm">
            Escolhe a data 💌
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedDate("Sexta 05/09")}
              className={`px-4 py-2 rounded-lg shadow-md ${
                selectedDate === "Sexta 05/09"
                  ? "bg-pink-500 text-white"
                  : "bg-white text-pink-900"
              }`}
            >
              Sexta 05/09
            </button>
            <button
              onClick={() => setSelectedDate("Sábado 06/09")}
              className={`px-4 py-2 rounded-lg shadow-md ${
                selectedDate === "Sábado 06/09"
                  ? "bg-pink-500 text-white"
                  : "bg-white text-pink-900"
              }`}
            >
              Sábado 06/09
            </button>
          </div>
          <div className="mt-6">
            <label className="block text-lg font-medium text-pink-900 mb-2">
              Escolhe o restaurante 🍽️
            </label>
            <select
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              className="px-4 py-2 rounded-lg shadow-md bg-white text-pink-900 border border-pink-400"
            >
              <option value="La Cuchilla">La Cuchilla</option>
              <option value="Aloha Restaurante">Aloha Restaurant</option>
              <option value="Mahai">Mahai</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700"
          >
            Confirmar escolha
          </button>
        </div>
      )}
    </div>
  );
}
