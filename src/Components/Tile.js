import PropTypes from "prop-types";
import styled from "styled-components";


const Tile = styled.div`box-shadow: 40px 10px 20px rgba(31, 32, 32, ${props => props.elevation});padding: 3%;`;


Tile.propTypes = {
  elevation: PropTypes.string
};

Tile.defaultProps = {
  elevation: "0.05"
};

export default Tile;


