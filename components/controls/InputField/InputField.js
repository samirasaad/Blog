import inputStyle from "./InputField.module.scss";

const InputField = ({
  inputValue,
  autoFocus,
  className,
  placeholder,
  handleChange,
  type,
}) => {
  return (
    <input
      value={inputValue}
      className={`${inputStyle.input} ${className}`}
      placeholder={placeholder}
      onChange={handleChange}
      type={type}
      autoFocus={autoFocus}
    />
  );
};

export default InputField;
