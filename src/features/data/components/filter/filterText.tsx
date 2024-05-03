import { Autocomplete, Chip, TextField } from "@mui/material"

const filtersText = (title: string, onChange: (value: string[]) => void) => {
  return (
    <div style={{ padding: "10px" }}>
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
        renderInput={params => <TextField label="Locations" {...params} />}
      />
    </div>
  )
}

export default filtersText
