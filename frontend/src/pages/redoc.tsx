import React from "react";
import { Box } from "@chakra-ui/react";

const RedocPage: React.FC = () => {
  return (
    <Box width="100%" height="100vh" position="relative">
      <iframe
        id="redoc-iframe"
        src="http://127.0.0.1:8000/redoc"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
      <style>
        {`
          #redoc-iframe {
            pointer-events: none;
          }
          #redoc-iframe::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 300px; /* Размер правой панели */
            height: 100%;
            background: white;
          }
        `}
      </style>
    </Box>
  );
};

export default RedocPage;
