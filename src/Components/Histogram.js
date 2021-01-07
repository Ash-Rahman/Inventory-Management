import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Bar(props) {
  const { percentage } = props;

  const StyledBar = styled.div`
    background: linear-gradient(
      180deg,
      rgba(56, 149, 95, 0.25),
      rgba(102, 210, 234, 0.25)
    );
    width: 30px;
    height: 70.74px;
    border-radius: 2px;
    display: flex;
    align-items: flex-end;
  `;

  const StyledInnerBar = styled.div`
    background: linear-gradient(
      180deg,
      rgba(56, 149, 95, 1),
      rgba(102, 210, 234, 0.5)
    );

    opacity: 100 !important;
    height: ${props => props.height + "%"};
    width: 100%;
    border-radius: 1px;
  `;

  return (
    <StyledBar>
      <StyledInnerBar height={percentage}> </StyledInnerBar>
    </StyledBar>
  );
}

Bar.propTypes = {
  percentage: PropTypes.number.isRequired
};




function Histogram(props) {
  const { bars, barCount } = props;

  const StyledHistogram = styled.div`
    display: flex;
    justify-content: space-around;
  `;

  return (
    <StyledHistogram>
      {bars.map((b, i) => (i <= barCount ? <Bar percentage={b} /> : ""))}
    </StyledHistogram>
  );
}

Histogram.propTypes = {
  bars: PropTypes.array.isRequired,
  barCount: PropTypes.number.isRequired
};

export default Histogram;
