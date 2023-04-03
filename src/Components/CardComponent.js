import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CardComponent = (props) => {
  return (
    <React.Fragment>
      <Card
        style={{
          width: "50vw",
          padding: "5px",
          margin: "5px",
          backgroundColor: "#a5f3fc",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Student Account :- {props.studentAccount}
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Organisation Account :- {props.orgnisationAccount}
          </Typography>
          <Typography variant="h5" component="div">
            {props.certificateName}
          </Typography>
          <Typography variant="h5" component="div">
            {props.certificateType}
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            size="small"
            onClick={() => {
              navigator.clipboard.writeText(
                `http://localhost:3000/Certificate/${props.orgnisationAccount}/${props.studentAccount}`
              );
            }}
          >
            Share
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default CardComponent;
