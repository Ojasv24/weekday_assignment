import { useCallback, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchDataAsync } from "./dataReducers"
import { Job } from "./dataAPI"
import { Grid } from "@mui/material"
import CardVariants from "./components/card"

const DataDisplay = () => {
  const dispatch = useAppDispatch()
  const { loading, offset, hasMore, shownData } = useAppSelector(
    state => state.data,
  )
  const loaderRef = useRef(null)

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return
    dispatch(fetchDataAsync(offset))
  }, [dispatch, offset, loading, hasMore])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const target = entries[0]
      if (target.isIntersecting) {
        fetchData()
      }
    })
    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [fetchData])

  const renderData = shownData.map((data: Job) => {
    return (
      <Grid item key={data.jdUid}>
        <CardVariants job={data} />
      </Grid>
    )
  })

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <Grid
          // direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{}}
          container
          spacing={8}
        >
          {renderData}
        </Grid>
      </div>
      <div ref={loaderRef}>{hasMore ? "Loading..." : ""}</div>
    </div>
  )
}

export default DataDisplay
