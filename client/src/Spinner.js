import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  display: block;
  margin: 0 auto;
`;

function Spinner({loading}) {
  return (
    <>
      <PuffLoader color='hsl(0, 0%, 17%)' loading={loading} css={override} size={15} />
    </>
  );
}

export default Spinner;