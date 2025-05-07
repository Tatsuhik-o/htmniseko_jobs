import { makeStyles } from "@mui/styles";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const useStyles = makeStyles({
  quill: {
    width: "100%",
    height: "100%",
  },
});

type TQuill = {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
};

export default function Quill({ description, setDescription }: TQuill) {
  const classes = useStyles();
  return (
    <div className={classes.quill}>
      <ReactQuill value={description} onChange={setDescription} />
    </div>
  );
}
