import { LoadingButton } from "@mui/lab"
import { Box } from "@mui/system"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import memoApi from "../api/memoApi"

const Home = () => {
  const navigate = useNavigate()
  const createMemo = async () => {
    try {
      setLoading(true)
      const res: any = await memoApi.create()
      // console.log(res)
      navigate(`/memo/${res._id}`)
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  }

  const [loading, setLoading] = useState(false)
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="absolute top-[45%]">
      <LoadingButton
        variant="outlined"
        onClick={() => createMemo()}
        loading={loading}
      >
        最初のメモを作成
      </LoadingButton>
      </div>
    </Box>
  )
}
export default Home
