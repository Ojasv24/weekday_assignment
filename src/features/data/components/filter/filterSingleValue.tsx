import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material"

interface FilterProps {
  minWidth?: number
  list: number[]
  title: string
  value?: number
  onChange: (event: SelectChangeEvent<number>) => void
}

export default function FilterSingleValue({
  minWidth,
  list,
  title,
  value,
  onChange,
}: FilterProps) {
  return (
    <div style={{ padding: "10px", minWidth: minWidth }}>
      <FormControl fullWidth size="small">
        <InputLabel>{title}</InputLabel>
        <Select value={value} label={title} onChange={onChange}>
          {list.map((role, index) => (
            <MenuItem key={index} value={role}>
              {role == 0 ? "Any" : role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
