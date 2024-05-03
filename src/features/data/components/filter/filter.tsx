import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

interface FilterProps {
  minWidth?: number
  topRoles: any[]
  title: string
  onChange: (value: any[]) => void
}

export default function Filter({
  topRoles,
  title,
  minWidth,
  onChange,
}: FilterProps) {
  return (
    <Autocomplete
      style={{ padding: "10px", minWidth: minWidth }}
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
