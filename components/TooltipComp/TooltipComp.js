import ReactTooltip from "react-tooltip";

const TooltipComp = ({ id, place, type, effect, multiline }) => {
  return (
    <ReactTooltip
      id={id}
      place={place}
      type={type}
      effect={effect}
      multiline={multiline}
    />
  );
};

export default TooltipComp;
