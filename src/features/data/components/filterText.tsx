import { Autocomplete, Chip, TextField } from "@mui/material";


const filtersText = (title: string, onChange: (value: any[]) => void) => {
    return (
      <div style={{ padding: '10px', width: "100%"}}> 
        <Autocomplete
        size='small'
        clearIcon={false}
        options={[]}
        freeSolo
        multiple
         onChange={ (_, value,) => onChange(value)} 
        renderTags={(value, props) =>
          value.map((option, index) => (
            <Chip label={option} {...props({ index })} />
          ))
        }
        renderInput={(params) => <TextField label="Locations" {...params} />}
      />
      </div>
    )
}

export default filtersText
