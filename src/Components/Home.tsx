import { Container, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type LangType = {
  name: string;
  code: string;
};

const languages: LangType[] = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Hindi",
    code: "hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "fr",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const selectedLangHandler = (langCode: string): void => {
    navigate(`/learn?language=${langCode}`);
  };
  return (
    <Container maxWidth={"sm"}>
      <Typography variant={"h4"} p={"2rem"} textAlign={"center"}>
        Welcome, Start you language journey now!
      </Typography>

      <Stack
        direction={"row"}
        spacing={"2rem"}
        p={""}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {languages.map((i) => (
          <Button
            onClick={() => {
              selectedLangHandler(i.code);
            }}
            key={i.code}
            variant="contained"
          >
            {i.name}
          </Button>
        ))}
      </Stack>
      <Typography m={"0.9rem"} textAlign={"center"}>
        Choose a language to start.
      </Typography>
    </Container>
  );
};

export default Home;
