import TextField from "@mui/material/TextField";
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import { Category } from "../../types/Category";
import { SyntheticEvent } from "react";

interface ComboBoxProps {
  onChangeHandler: (
    event: SyntheticEvent<Element, Event>,
    value: Category | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails
  ) => void;
}
export default function ComboBox(props: ComboBoxProps) {
  const categories = Object.values(Category);

  return (
    <Autocomplete
      disablePortal
      className="font-outfit"
      id="combo-box-demo"
      options={categories}
      onChange={props.onChangeHandler}
      renderInput={(params) => <TextField {...params} label="Categoría" />}
    />
  );
}
