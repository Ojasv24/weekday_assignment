import { Autocomplete, Chip, TextField } from "@mui/material"

interface FilterProps {
  title: string
  onChange: (value: string[]) => void
}

export default function FilterText({ title, onChange }: FilterProps) {
  return (
    <div style={{ padding: "10px", width: "100%" }}>
      <Autocomplete
        size="small"
        clearIcon={false}
        options={[]}
        style={{ width: "100%" }}
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
