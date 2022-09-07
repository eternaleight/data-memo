import { DeleteOutlined, StarBorderOutlined } from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import memoApi from "../api/memoApi"

const Memo = () => {
  const [title, setTitle] = useState<string>("")
  const [desc, setDesc] = useState<string>("")
  const { memoId } = useParams()
  useEffect(() => {
    const getMemo = async () => {
      try {
        const res: any = await memoApi.getOne(memoId)
        setTitle(res.title)
        setDesc(res.description)
        console.log(res.description)
      } catch (err) {
        alert(err)
      }
    }
    getMemo()
  }, [memoId])

  let timer: any
  const timeout = 500

  const updateTitle = async (e: any) => {
    clearTimeout(timer)
    const newTitle = e.target.value
    setTitle(newTitle)
    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTitle })
      } catch (err) {
        alert(err)
      }
    }, timeout)
  }

  const updateDesc = async (e: any) => {
    clearTimeout(timer)
    const newDesc = e.target.value
    setDesc(newDesc)
    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDesc })
      } catch (err) {
        alert(err)
      }
    }, timeout)
  }

  const deleteMemo = async () => {
    try {
      const deletedMemo = await memoApi.delete(memoId)
      console.log(deletedMemo)
    } catch (err) {
      alert(err)
    }
  }

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
          <DeleteOutlined onClick={deleteMemo} />
        </IconButton>
      </Box>
      <Box sx={{ p: "10px 50px" }}>
        <TextField
          onChange={updateTitle}
          value={title}
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
          onChange={updateDesc}
          value={desc}
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
