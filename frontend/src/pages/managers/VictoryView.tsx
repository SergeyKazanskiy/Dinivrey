import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import crownImage from "./crown.png"; // Добавь изображение короны в проект
import confetti from "./confetti.gif"; // Добавь гифку с салютом в проект

type VictoryPageProps = {
  username: string;
};

export default function VictoryPage({ username }: VictoryPageProps) {
  const [showCrown, setShowCrown] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCrown(true), 2000); // Показать корону через 2 сек
    setTimeout(() => setShowBackground(true), 3000); // Показать фон через 3 сек
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden">
      {showBackground && (
        <motion.img
          src={confetti}
          alt="Fireworks"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      )}
      <motion.div
        initial={{ fontSize: "10px", opacity: 0 }}
        animate={{ fontSize: "100px", opacity: 1 }}
        transition={{ duration: 2 }}
        className="relative text-white font-bold"
      >
        {username}
      </motion.div>
      {showCrown && (
        <motion.img
          src={crownImage}
          alt="Crown"
          className="absolute top-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      )}
    </div>
  );
}
