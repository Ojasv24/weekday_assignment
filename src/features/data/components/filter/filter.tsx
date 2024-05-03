import { Grid, Stack } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

interface FilterProps {
  topRoles: any[]
  title: string
  onChange: (value: any[]) => void
}

export default function Filter({ topRoles, title, onChange }: FilterProps) {
  return (
    <Autocomplete
      style={{ padding: "10px", width: "100%" }}
      size="small"
      multiple
      options={topRoles}
      onChange={(_, value) => onChange(value)}
      getOptionLabel={topRoles => topRoles}
      renderInput={params => (
        <TextField key={params.id} {...params} label={title} />
      )}
    />
  )
}
