import { DeleteOutlined, StarBorderOutlined } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import memoApi from "../api/memoApi"

const Memo = () => {
  const { memoId } = useParams()
  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId)
        console.log(res);
      } catch (err) {
        alert(err)
      }
    }
    getMemo()
  }, [memoId])
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton color="error">
          <DeleteOutlined />
        </IconButton>
      </Box>
      <Box sx={{ p: "10px 50px" }}>
        <TextField
          placeholder="無題"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { p: 0 },
          ".MuiOutlinedInput-notchedOutline": { border: "none" },
          ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
          }}
        />
        <TextField
          placeholder="追加"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { p: 0 },
          ".MuiOutlinedInput-notchedOutline": { border: "none" },
          ".MuiOutlinedInput-root": { fontSize: "1rem", fontWeight: "0" },
          }}
        />
      </Box>
    </>
  )
}
export default Memo
