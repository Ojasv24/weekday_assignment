import { Button } from "@mui/material"
import React, { useState } from "react"

function AboutCompany({
  jobDetailsFromCompany,
}: {
  jobDetailsFromCompany: string
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const shortDescription = jobDetailsFromCompany.slice(0, 220)
  const fullDescription = jobDetailsFromCompany

  const handleClickViewMore = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div style={{ fontSize: "14px", whiteSpace: "pre-wrap" }}>
      <div>{isExpanded ? fullDescription : shortDescription}</div>
      <Button size="small">{isExpanded ? "View Less" : "View More"}</Button>
    </div>
  )
}

export default AboutCompany
