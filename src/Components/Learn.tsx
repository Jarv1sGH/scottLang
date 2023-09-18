import { Container, Button, Typography, Stack } from "@mui/material";
import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Learn = () => {
  const [count, setCount] = useState<number>(0);
  // LangType is defined in vite-env.tds
  const params = useSearchParams()[0].get("language") as LangType;

  const navigate = useNavigate();

  const nextQuesHandler = (): void => {
    setCount((prev) => prev + 1);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: "1rem",
      }}
    >
      <Button
        onClick={
          count === 0
            ? () => {
                navigate("/");
              }
            : () => {
                setCount((prev) => prev - 1);
              }
        }
      >
        <ArrowBack />
      </Button>

      <Typography m={"2rem 0"}>ScottLang your langauage partner</Typography>
      <Stack direction={"row"} spacing={"1rem"}>
        <Typography variant="h4">
          {count + 1} - {"Sample"}
        </Typography>
        <Typography color="lightGreen" variant="h4">
          : {"Sample"}
        </Typography>

        <Button
          sx={{
            borderRadius: "50%",
          }}
        >
          <VolumeUp />
        </Button>
      </Stack>
      <Button
        sx={{
          margin: "3rem 0",
        }}
        variant="contained"
        fullWidth
        onClick={
          count === 7
            ? () => {
                navigate("/quiz");
              }
            : nextQuesHandler
        }
      >
        {count === 7 ? "Take test" : "Next"}
      </Button>
    </Container>
  );
};

export default Learn;
