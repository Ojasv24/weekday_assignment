import { Card } from "@mui/material"
import Filter from "./filter/filter"
import {
  changeCompanyName,
  changeRemote,
  changeRoles,
  changelocation,
  changeminExprience,
  changeminSalary,
} from "../dataReducers"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import FilterText from "./filter/filterText"
import FilterSingleValue from "./filter/filterSingleValue"
const Filters = () => {
  const rolesFilters = [
    "frontend",
    "ios",
    "android",
    "backend",
    "fullstack",
    "tech lead",
  ]
  const minExpFilters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const minSalaryFilters = [0, 10, 20, 30, 40, 50, 60, 70]
  const workSiteFilters = ["Remote", "Onsite"]
  const dispatch = useAppDispatch()
  const { minSalary, minExperience, remote } = useAppSelector(
    state => state.data.filters,
  )
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
          topRoles={rolesFilters}
          title="Roles"
          onChange={value => dispatch(changeRoles(value))}
        ></Filter>
        <FilterSingleValue
          minWidth={200}
          value={minExperience == 0 ? undefined : minExperience}
          // list={filtersText}
          list={minExpFilters}
          title="Minimum Experience"
          onChange={value =>
            dispatch(changeminExprience(value.target.value as number))
          }
        ></FilterSingleValue>
        <FilterSingleValue
          minWidth={200}
          value={minSalary == 0 ? undefined : minSalary}
          // list={filtersText}
          list={minSalaryFilters}
          title="Minimum Salary"
          onChange={value =>
            dispatch(changeminSalary(value.target.value as number))
          }
        ></FilterSingleValue>
        <Filter
          minWidth={100}
          topRoles={workSiteFilters}
          title="Remote"
          onChange={value => dispatch(changeRemote(value))}
        ></Filter>
        <FilterText
          disabled={remote.includes("Remote") ? true : false}
          minWidth={200}
          title="Location"
          onChange={value => dispatch(changelocation(value))}
        ></FilterText>
        <FilterText
          disabled={false}
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
