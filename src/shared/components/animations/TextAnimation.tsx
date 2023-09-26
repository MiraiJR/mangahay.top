import { motion } from "framer-motion";

interface itemProps {
  text: string;
}

const TextAnimation = ({ text }: itemProps) => {
  return (
    <motion.div>
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: index * 0.05 }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default TextAnimation;
