import { Card } from "@mui/material"
import filters from "./features/data/components/filter_list"
import DataDisplay from "./features/data/dataDisplay"
import Filters from "./features/data/components/filter_list"
import SearchJobText from "./features/data/components/search_job_text"

const App = () => {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Lexend",
      }}
    >
      <Card
        sx={{
          fontWeight: "bold",
          fontSize: "24px",
          alignSelf: "center",
          width: "100%",
        }}
      >
        <div style={{ padding: "10px" }}>👋 Ojasv</div>
      </Card>
      <SearchJobText></SearchJobText>
      <Filters />
      <DataDisplay />
    </div>
  )
}

export default App
