import SearchForm from "@/components/Form/Input/inheritedInputs/SearchInput/SearchForm";
import {searchFieldName} from "./SearchField.constances";

function SearchField() {
  return (
    <SearchForm
      fieldName={searchFieldName}
    />
  );
}

export default SearchField;
