import { Autocomplete, Chip, TextField } from "@mui/material"

interface FilterProps {
  minWidth?: number
  title: string
  onChange: (value: string[]) => void
}

export default function FilterText({ title, onChange, minWidth }: FilterProps) {
  return (
    <div style={{ padding: "10px", minWidth: minWidth }}>
      <Autocomplete
        size="small"
        clearIcon={false}
        options={[]}
        freeSolo
        multiple
        onChange={(_, value) => onChange(value)}
        renderTags={(value, props) =>
          value.map((option, index) => (
            <Chip label={option} {...props({ index })} />
          ))
        }
        renderInput={params => <TextField label={title} {...params} />}
      />
    </div>
  )
}
