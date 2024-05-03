import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { changeRoles, reloadFilteredData } from '../dataReducers';

export default function Filter(topRoles : string[], title: string, onChange: (value: any[]) => void) {
  // const dispatch = useAppDispatch(); 
  // (dispatch(), dispatch(reloadFilteredData([])))
  return (
    <div style={{ padding: '10px', width: "100%"}}> 
      <Autocomplete 
      size='small'
        multiple
        id="tags-outlined"
        options={topRoles}
        onChange={ (_, value,) => onChange(value)} 
        getOptionLabel={(topRoles) => topRoles} 
        renderInput={(params) => (
          <TextField
            {...params}
            label={title}
            
          />
        )}
      />

    </div>
  );
}



