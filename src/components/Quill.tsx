import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { AppContext } from "../utils/context";

const useStyles = makeStyles({
  quill: {
    width: "100%",
    height: "100%",
    minHeight: "400px",
    "& > *": {
      height: (props: { mobileView: boolean | undefined }) =>
        props.mobileView ? "calc(100% - 70px)" : "calc(100% - 50px)",
      width: "100%",
    },
  },
});

type TQuill = {
  description: string;
  setDescription: (value: string) => void;
};

export default function Quill({ description, setDescription }: TQuill) {
  const { mobileView } = useContext(AppContext);
  const classes = useStyles({ mobileView });
  return (
    <div className={classes.quill}>
      <ReactQuill value={description} onChange={setDescription} />
    </div>
  );
}
