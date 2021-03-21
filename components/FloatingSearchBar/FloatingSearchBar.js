import InputField from "./../controls/InputField/InputField";
import FloatingSearchBarStyles from "./FloatingSearchBar.module.scss";

function FloatingSearchBar({
  handleSearchChange,
  handleSubmitSearch,
  searchValue,
  placeholder,
  className
}) {
  return (
    <form
      role="search"
      className={`${FloatingSearchBarStyles.search_form} ${className}`}
      onSubmit={handleSubmitSearch}
    >
      <InputField
        type="text"
        className={`${FloatingSearchBarStyles.search_text}`}
        placeholder={placeholder}
        handleChange={handleSearchChange}
        inputValue={searchValue}
      />
    </form>
  );
}

export default FloatingSearchBar;
