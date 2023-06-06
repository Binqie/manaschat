import { Typography } from "@mui/material";
import MainContainer from "widgets/mainContainer";
import ManasEkonom from "shared/assets/manas-ekonom.jpg";

const Home = () => {
  return (
    <div>
      <MainContainer>
        <Typography maxWidth={1000}>
          <b>"Манасчат"</b> сүйүктүү университетибизди дагы да бекем
          бириктирүүнү, билим, пикир жана маалымат алмашууну, эмоциялар менен
          бөлүшүүнү көздөгөн уникалдуу платформа. Бизге кошулуңуз!
        </Typography>
        <img style={{ maxWidth: 1000 }} src={ManasEkonom} />
      </MainContainer>
    </div>
  );
};

export default Home;
