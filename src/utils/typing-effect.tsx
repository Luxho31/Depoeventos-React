import { useEffect, useState } from "react";
import "./typing-effect.css"; // Archivo CSS para los estilos de la animación

interface TypingEffectProps {
  text: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex === text.length) {
      return; // Si ya se ha mostrado todo el texto, no hacemos nada más
    }

    const interval = setInterval(() => {
      if (currentIndex === text.length) {
        clearInterval(interval);
      } else {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 100); // Tiempo en milisegundos entre cada letra

    return () => clearInterval(interval);
  }, [text, currentIndex]);

  return (
    <div
      className={
        currentIndex === text.length ? "font-mono font-bold" : "typing-effect"
      }
    >
      {displayText}
    </div>
  );
};

export default TypingEffect;
