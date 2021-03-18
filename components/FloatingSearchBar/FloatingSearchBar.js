import { useState } from "react";
import FloatingSearchBarStyles from "./FloatingSearchBar.module.scss";

function FloatingSearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const onSearchValue = () => {
    console.log("submiited");
    // History.push(`/contributers/search/${searchValue ? searchValue : " "}`);
  };

  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <form
      role="search"
      className={`${FloatingSearchBarStyles.search_form} mx-2`}
      onSubmit={(event) => {
        event.preventDefault();
        onSearchValue();
      }}
    >
      <input
        type="text"
        className={`${FloatingSearchBarStyles.search_text}`}
        placeholder="Author name or Category name"
        onChange={onSearchChange}
        value={searchValue}
      />
    </form>
  );
}

export default FloatingSearchBar;
