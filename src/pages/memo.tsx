import {
  DeleteOutlined,
  DensityMedium,
  StarBorderOutlined,
} from "@mui/icons-material"
import { IconButton, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import memoApi from "../api/memoApi"
import { setMemo } from "../redux/features/memoSlice"
import { setBar } from "../redux/features/barSlice"
import EmojiPicker from "../components/common/emojipicker"

const Memo = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const memos = useSelector((state: any) => state.memo.value)
  const barBool = useSelector((state: any) => state.bar.value)
  const [title, setTitle] = useState<string>("")
  const [desc, setDesc] = useState<string>("")
  const [icon, setIcon] = useState<string>("")
  const barVisible = () => dispatch(setBar(!barBool))
  const { memoId } = useParams()
  useEffect(() => {
    const getMemo = async () => {
      try {
        const res: any = await memoApi.getOne(memoId)
        setTitle(res.title)
        setDesc(res.description)
        setIcon(res.icon)
        // console.log(res.description)
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
      const newMemos = memos.filter((e: any) => e._id !== memoId)
      if (newMemos.length === 0) {
        navigate("/memo")
      } else {
        navigate(`/memo/${newMemos[0]._id}`)
      }
      dispatch(setMemo(newMemos))
    } catch (err) {
      alert(err)
    }
  }

  const onIconChange = async (newIcon: any) => {
    let temp = [...memos]
    const index = temp.findIndex((e) => e._id === memoId)
    temp[index] = { ...temp[index], icon: newIcon }
    setIcon(newIcon)
    dispatch(setMemo(temp))
    try {
      await memoApi.update(memoId, { icon: newIcon })
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
          backgroundColor: "",
        }}
      >
        <IconButton>
          <StarBorderOutlined className="" />
        </IconButton>
        <IconButton color="error">
          <DeleteOutlined onClick={deleteMemo} />
        </IconButton>
        <div className='absolute sm:hidden right-2' onClick={barVisible}>
        <IconButton>
          <DensityMedium />
        </IconButton>
        </div>
      </Box>
      <Box sx={{ p: "10px 50px" }}>
        <Box>
          <EmojiPicker icon={icon} onIconChange={onIconChange} />
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
      </Box>
    </>
  )
}
export default Memo
