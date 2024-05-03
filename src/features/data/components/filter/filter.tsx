import { Grid, Stack } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

export default function Filter(
  topRoles: any[],
  title: string,
  onChange: (value: any[]) => void,
) {
  return (
    <Autocomplete
      size="small"
      multiple
      style={{ width: "100%" }}
      options={topRoles}
      onChange={(_, value) => onChange(value)}
      getOptionLabel={topRoles => topRoles}
      renderInput={params => (
        <TextField key={params.id} {...params} label={title} />
      )}
    />
  )
}
