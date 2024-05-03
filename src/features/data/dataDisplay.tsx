import { useCallback, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchJobAsync } from "./dataReducers"
import { Job } from "./dataAPI"
import { CircularProgress, Grid } from "@mui/material"
import CardVariants from "./components/card"

const JobDisplay = () => {
  const dispatch = useAppDispatch()
  const { loading, offset, hasMore, shownJob } = useAppSelector(
    state => state.data,
  )
  const loaderRef = useRef(null)

  const fetchJob = useCallback(async () => {
    if (loading || !hasMore) return
    dispatch(fetchJobAsync(offset))
  }, [dispatch, offset, loading, hasMore])

  useEffect(() => {
    fetchJob()
  }, [])

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const target = entries[0]
      if (target.isIntersecting) {
        fetchJob()
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
  }, [fetchJob])

  const renderJob = shownJob.map((job: Job) => {
    return (
      <Grid item key={job.jdUid}>
        <CardVariants job={job} />
      </Grid>
    )
  })

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px" }}>
        <Grid
          alignItems="center"
          justifyContent="center"
          sx={{}}
          container
          spacing={8}
        >
          {renderJob}
        </Grid>
      </div>
      <div style={{ alignSelf: "center" }} ref={loaderRef}>
        {hasMore ? <CircularProgress /> : null}
      </div>
    </div>
  )
}

export default JobDisplay
