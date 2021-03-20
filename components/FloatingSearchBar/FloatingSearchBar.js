import InputField from './../controls/InputField/InputField';
import FloatingSearchBarStyles from "./FloatingSearchBar.module.scss";

function FloatingSearchBar({handleSearchChange, handleSubmitSearch, searchValue}) {

  return (
    <form
      role="search"
      className={`${FloatingSearchBarStyles.search_form} mx-2`}
      onSubmit={handleSubmitSearch}
    >
      <InputField
        type="text"
        className={`${FloatingSearchBarStyles.search_text}`}
        placeholder="Search with Author name"
        handleChange={handleSearchChange}
        inputValue={searchValue}
      />
    </form>
  );
}

export default FloatingSearchBar;
