import { Box } from "@mui/material";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { Animations } from "../themes/Animations";

const PageLoader = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      {isLoading ? (
        <Lottie
          animationData={Animations.loadingSpinner}
          loop
          style={{
            height: "300px",
          }}
        />
      ) : null}
    </Box>
  );
};

export default PageLoader;
