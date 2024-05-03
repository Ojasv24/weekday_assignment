import { Box, Card, CardContent, Typography } from "@mui/material"
import Filter from "./filter/filter"
import {
  changeCompanyName,
  changeRemote,
  changeRoles,
  changelocation,
  changeminExprience,
  changeminSalary,
} from "../dataReducers"
import { useAppDispatch } from "../../../app/hooks"
import filtersText from "./filter/filterText"
import FilterText from "./filter/filterText"
const Filters = () => {
  const topRoles = ["frontend", "ios", "android", "backend"]
  const topMinExp = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  const topMinSalary = ["0", "10", "20", "30", "40", "50", "60", "70"]
  const topRemote = ["Remote", "Onsite"]
  const dispatch = useAppDispatch()
  return (
    <Card
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ alignSelf: "center" }}>Filters</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Filter
          minWidth={100}
          topRoles={topRoles}
          title="Roles"
          onChange={value => dispatch(changeRoles(value))}
        ></Filter>
        <Filter
          minWidth={200}
          topRoles={topMinExp}
          title="Minimum Experience"
          onChange={value => dispatch(changeminExprience(value))}
        ></Filter>
        <Filter
          minWidth={200}
          topRoles={topMinSalary}
          title="Minimum Salary"
          onChange={value => dispatch(changeminSalary(value))}
        ></Filter>
        <Filter
          minWidth={100}
          topRoles={topRemote}
          title="Remote"
          onChange={value => dispatch(changeRemote(value))}
        ></Filter>
        <FilterText
          minWidth={200}
          title="Location"
          onChange={value => dispatch(changelocation(value))}
        ></FilterText>
        <FilterText
          minWidth={200}
          title="Company Name"
          onChange={value => dispatch(changeCompanyName(value))}
        ></FilterText>
      </div>
    </Card>
  )
}

// okay
export default Filters
