import { Chip } from "@mui/material"
import { useAppSelector } from "../../../app/hooks"

const SearchJobText = () => {
  const { shownData } = useAppSelector(state => state.data)
  return (
    <div
      style={{
        alignSelf: "center",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ alignSelf: "end", marginRight: "-30px", marginBottom: "-5px" }}>
          <Chip
            size="small"
            label={shownData.length}
            style={{
              backgroundColor: "rgb(25, 118, 210)",
              color: "white",
              fontWeight: "bold",
              lineHeight: "1",
              fontSize: "12px",
            }}
          />
        </div>
        <div
          style={{
            fontWeight: "500",
            fontSize: "16px",
            textDecorationLine: "underline",
            textDecorationColor: "rgb(25, 118, 210)",
          }}
        >
          Search Jobs
        </div>
      </div>
    </div>
  )
}

export default SearchJobText
