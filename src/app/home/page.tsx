"use client";

import { useState } from "react";

export default function Convite() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ top: "0%", left: "auto", right: "0%" });
  const [selectedDate, setSelectedDate] = useState("");

  const handleNoClickAttempt = () => {
    const randomTop = Math.floor(Math.random() * 70) + "%";
    const randomLeft = Math.floor(Math.random() * 70) + "%";
    setNoPos({ top: randomTop, left: randomLeft, right: "auto" });
  };

  const handleSubmit = async () => {
    if (!selectedDate) return;

    await fetch("/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: selectedDate }),
    });
    alert("Marcado então! 🎉");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-200 text-center">
      {!accepted ? (
        <>
          <h1 className="text-4xl font-bold mb-10 text-pink-900 drop-shadow-md">
            Quer jantar comigo? 💕
          </h1>

          {/* Botões lado a lado */}
          <div className="flex justify-between w-80 relative">
            <button
              onClick={() => setAccepted(true)}
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600"
            >
              Sim 💖
            </button>

            <button
              onMouseDown={handleNoClickAttempt} // só ao tentar clicar
              style={{
                position: "absolute",
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
          {/* Vídeo romântico do YouTube */}
          <div className="w-96 h-56 rounded-xl shadow-lg overflow-hidden">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/kPa7bsKwL-c?autoplay=1"
              title="Romantic Music"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Escolha da data */}
          <h2 className="text-2xl font-semibold text-pink-900 drop-shadow-sm">
            Escolha a data 💌
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedDate("Sábado 30/08")}
              className={`px-4 py-2 rounded-lg shadow-md ${
                selectedDate === "Sábado 30/08"
                  ? "bg-pink-500 text-white"
                  : "bg-white text-pink-900"
              }`}
            >
              Sábado 30/08
            </button>
            <button
              onClick={() => setSelectedDate("Domingo 31/08")}
              className={`px-4 py-2 rounded-lg shadow-md ${
                selectedDate === "Domingo 31/08"
                  ? "bg-pink-500 text-white"
                  : "bg-white text-pink-900"
              }`}
            >
              Domingo 31/08
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700"
          >
            Confirmar escolha
          </button>
        </div>
      )}
    </div>
  );
}
