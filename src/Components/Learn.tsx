import { Container, Button, Typography, Stack } from "@mui/material";
import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchTranslation } from "../utils/apiCall";
import { useDispatch, useSelector } from "react-redux";
import {
  getWordsReq,
  getWordsSuccess,
  getWordsFail,
  clearState,
} from "../Redux/slices";
import Loader from "./Loader";
const Learn = () => {
  const [count, setCount] = useState<number>(0);
  // LangType is defined in vite-env.tds
  const params = useSearchParams()[0].get("language") as LangType;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, words, error } = useSelector(
    (state: { root: StateType }) => state.root
  );

  const nextQuesHandler = (): void => {
    setCount((prev) => prev + 1);
  };

  useEffect(() => {
    dispatch(getWordsReq());
    fetchTranslation(params || "fr")
      .then((arr: WordType[]) => {
        dispatch(getWordsSuccess(arr));
      })
      .catch((err) => {
        dispatch(getWordsFail(err));
      });
    if (error) {
      alert("error occured");
      dispatch(clearState());
    }
  }, []);

  if (loading) return <Loader />;
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
          {count + 1} - {words[count]?.word}
        </Typography>
        <Typography color="lightGreen" variant="h4">
          : {words[count]?.meaning}
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
          count === words.length - 1
            ? () => {
                navigate("/quiz");
              }
            : nextQuesHandler
        }
      >
        {count === words.length - 1 ? "Take test" : "Next"}
      </Button>
    </Container>
  );
};

export default Learn;
