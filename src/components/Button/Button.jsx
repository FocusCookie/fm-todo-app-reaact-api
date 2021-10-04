import React from "react";
import PropTypes from "prop-types";
import "./button.css";

export const Button = ({ active, size, label, ...props }) => {
  return (
    <button
      type="button"
      className={[`${active ? "btn-active" : "btn"}`, `btn--${size}`].join(" ")}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  /**
   * In which variant should the button rendered primary, secondary or text
   */
  active: PropTypes.bool,
  /**
   * How large should the button be?
   */
  size: PropTypes.oneOf(["small", "normal"]),
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  active: false,
  size: "normal",
  onClick: undefined,
};