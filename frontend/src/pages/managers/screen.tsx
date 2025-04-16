import { useState, useEffect } from "react";
import crownImage from "./crown.png"; // Добавь изображение короны в проект
import confetti from "./confetti.gif"; // Добавь гифку с салютом в проект


export function ManagersPage() {
  const [showCrown, setShowCrown] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [fontSize, setFontSize] = useState(10);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    let size = 10;
    const interval = setInterval(() => {
      size += 5;
      setFontSize(size);
      setOpacity(size >= 100 ? 1 : size / 100);
      if (size >= 100) clearInterval(interval);
    }, 50);

    setTimeout(() => setShowCrown(true), 3000); // Показать корону через 2 сек
    setTimeout(() => setShowBackground(true), 1000); // Показать фон через 3 сек

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden">
      {showBackground && (
        <img src={confetti} alt="Fireworks"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: showBackground ? 1 : 0, transition: "opacity 1s" }}
        />
      )}
      <div className="relative text-white font-bold"
        style={{ fontSize: `${fontSize}px`, opacity, transition: "font-size 0.05s, opacity 0.05s" }}
      >
        Hello
      </div>
      {showCrown && (
        <img src={crownImage} alt="Crown" className="absolute top-20"
          style={{ opacity: showCrown ? 1 : 0, transform: showCrown ? "translateY(0)" : "translateY(-50px)", transition: "opacity 2s, transform 2s" }}
        />
      )}
    </div>
  );
}
