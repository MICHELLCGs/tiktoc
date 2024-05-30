import styled from 'styled-components';

const ColorScrollBar = styled.div`
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  bottom: ${(props) => (props.volume ? null : '0%')};
  transform: ${(props) => (props.volume ? 'auto' : 'translateY(0px) !important')};
`;

const BackgroundVolume1 = styled.div`
  background-color: black;
  width: 5px;
  flex-grow: ${(props) => (props.volume ? props.amount : 100)};
`;
const BackgroundVolume2 = styled.div`
  background-color: white;
  width: 5px;
  flex-grow: ${(props) => (props.volume ? 40 - props.amount : 0)};
`;

export { ColorScrollBar, BackgroundVolume1, BackgroundVolume2 };
