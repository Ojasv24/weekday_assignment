import { Card } from "@mui/material"
import filters from "./features/data/components/filters"
import DataDisplay from "./features/data/dataDisplay"
import Filters from "./features/data/components/filters"

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
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "24px",
          alignSelf: "center",
          textDecorationLine: "underline",
          textDecorationColor: "blue",
        }}
      >
        Search Jobs
      </div>
      <Filters />
      <DataDisplay />
    </div>
  )
}

export default App
