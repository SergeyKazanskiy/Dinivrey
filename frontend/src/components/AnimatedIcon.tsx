import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'

export const AnimatedIcon: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1, rotate: 360 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <Icon as={AddIcon} boxSize={10} color="yellow.400" />
    </motion.div>
  );
};


