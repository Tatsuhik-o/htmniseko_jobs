import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles({
  radio_group: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  radios: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-start",
  },
  radio: {
    display: "flex",
    gap: "10px",
    cursor: "pointer",
    "& input": {
      width: "15px",
      aspectRatio: "1",
    },
  },
});

type TRadioGroup = {
  content: string;
  radios: string[];
  holderForNow: any;
};

export default function RadioGroup({
  content,
  radios,
  holderForNow,
}: TRadioGroup) {
  const classes = useStyles();
  const [isSelected, setIsSelected] = useState<string>("");

  return (
    <div className={classes.radio_group}>
      <Typography variant="subtitle2" style={{ fontWeight: "600" }}>
        {content}
      </Typography>
      <Box sx={{ border: "none" }} className={classes.radios} id="radios">
        {radios.map((radioElement, idx) => {
          return (
            <label
              htmlFor={`${content}-${radioElement}`}
              className={classes.radio}
              style={{
                fontWeight: isSelected === radioElement ? "600" : "400",
              }}
              key={idx}
              onClick={() => {
                setIsSelected(radioElement);
                holderForNow(radioElement);
              }}
            >
              <input
                type="radio"
                value={radioElement}
                id={`${content}-${radioElement}`}
                name={content}
                checked={radioElement === isSelected}
                onChange={(e) => {
                  setIsSelected(e.target.value);
                  holderForNow(e.target.value);
                }}
              />
              <Typography variant="subtitle2" component="span">
                {radioElement}
              </Typography>
            </label>
          );
        })}
      </Box>
    </div>
  );
}
