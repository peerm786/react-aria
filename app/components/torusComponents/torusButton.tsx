import { Button } from "react-aria-components";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const TorusButton = ({
  value,
  isDisabled,
  Children,
  autoFocus,
  gap,
  onPress,
  size = "md",
  buttonClassName,
  marginT,
  color,
  outlineColor,
  radius = "lg",
  btncolor,
  fontStyle,
  btnTxtSize,
  endContent,
  startContent,
  borderColor,
  isIconOnly,
}:any) => {
  const outlineFn = () => {
    if (outlineColor) {
      return ` torus-hover:ring-2 torus-hover:ring-offset-4  ${outlineColor}`;
    }
    return "outline-none";
  };

  const hoverOutline = outlineFn();

  const sizeClasses :any = {
    sm: "px-1.5 py-0.5",
    md: "px-2.5 py-1.5",
    lg: "p-3.5 py-2.5",
    xl: "px-4.5 py-3.5",
    full: "px-5.5 py-4.5",
  };

  const radiusClasses :any = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  const commonClass = `font-lg w-[100%] ${marginT} 
  border-none outline-none torus-pressed:animate-torusButtonActive 
  torus-hover:outline-none torus-hover:border-2 ${hoverOutline} ${gap} ${
    (startContent || endContent) && "flex justify-center items-center"
  } ${radiusClasses[radius] || "rounded-lg"}`;

  const contentClass = sizeClasses[size] || "";

  return (
    <Button
      style={{
        background: `${
          btncolor && btncolor === "primary"
            ? "#0736C4"
            : btncolor === "secondary"
            ? "#F4F5FA"
            : btncolor === "success"
            ? "#17C964"
            : btncolor === "danger"
            ? "#F5A524"
            : btncolor === "warning"
            ? "#F5A524"
            : btncolor
        }`,
        border: borderColor ? borderColor : "0736C4",
      }}
      className={twMerge(commonClass, buttonClassName)}
      value={value}
      isDisabled={isDisabled}
      autoFocus={autoFocus}
      onPress={onPress}
    >
      {isIconOnly ? (
        <div
          className={`${contentClass} w-[100%] flex justify-center items-center`}
        >
          {Children}
        </div>
      ) : startContent ? (
        <div className={`${contentClass} flex justify-center items-center`}>
          <div className="w-[100%] flex justify-evenly gap-1">
            <div className="w-[20%] flex justify-center items-center">
              {startContent}
            </div>
            <div className={`${fontStyle} w-[80%] flex justify-center pr-1`}>
              {Children}
            </div>
          </div>
        </div>
      ) : endContent ? (
        <div className={`${contentClass} flex justify-center items-center`}>
          <div className="w-[100%] flex justify-evenly gap-1">
            <div className={`${fontStyle} w-[80%] flex justify-start pr-1`}>
              {Children}
            </div>
            <div className="w-[20%] flex justify-center items-center">
              {endContent}
            </div>
          </div>
        </div>
      ) : (
        <p className={`${fontStyle} ${contentClass}`}>{Children}</p>
      )}
    </Button>
  );
};

TorusButton.propTypes = {
  value: PropTypes.string,
  isDisabled: PropTypes.bool,
  Children: PropTypes.node,
  autoFocus: PropTypes.bool,
  gap: PropTypes.string,
  onPress: PropTypes.func,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
  buttonClassName: PropTypes.string,
  marginT: PropTypes.string,
  color: PropTypes.string,
  outlineColor: PropTypes.string,
  radius: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
  btncolor: PropTypes.string,
  fontStyle: PropTypes.string,
  btnTxtSize: PropTypes.string,
  endContent: PropTypes.node,
  startContent: PropTypes.node,
  borderColor: PropTypes.string,
  isIconOnly: PropTypes.bool,
  isDropDown: PropTypes.bool,
};

export default TorusButton;
