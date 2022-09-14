import { AddBoxOutlined, LogoutOutlined } from "@mui/icons-material"
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import memoApi from "../../api/memoApi"
import { setMemo } from "../../redux/features/memoSlice"

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const dispatch = useDispatch()
  const user = useSelector((state: any) => state.user.value)
  const memos = useSelector((state: any) => state.memo.value)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const { memoId } = useParams()

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll()
        dispatch(setMemo(res))
      } catch (err) {
        alert(err)
      }
    }
    getMemos()
  }, [dispatch])

  useEffect(() => {
    const activeIndex = memos.findIndex((e: any) => e._id === memoId)
    setActiveIndex(activeIndex)
  }, [navigate])

  const createMemo = async () => {
    try {
      const res: any = await memoApi.create()
      const newMemos = [res, ...memos]
      dispatch(setMemo(newMemos))
      navigate(`/memo/${res._id}`)
      // console.log(memos)
    } catch (err) {
      alert(err)
    }
  }

  return (
      <Drawer
        container={window.document.body}
        variant="permanent"
        open={true}
        sx={{ width: 250, height: "100vh" }}
        // {/* className="sm:!w-[250px]" */}
      >
        <List
          sx={{
            width: 250,
            height: "100vh",
            backgroundColor: "#222233",
          }}
          // className="sm:!w-[250px]"
        >
          <ListItemButton>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" fontWeight="700">
                {user.username}
              </Typography>
              <IconButton onClick={logout}>
                <LogoutOutlined />
              </IconButton>
            </Box>
          </ListItemButton>
          <Box sx={{ pt: "10px" }}></Box>
          <ListItemButton>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" fontWeight="700">
                お気に入り
              </Typography>
              <IconButton></IconButton>
            </Box>
          </ListItemButton>
          <Box sx={{ pt: "10px" }}></Box>
          <ListItemButton>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" fontWeight="700">
                プライベート
              </Typography>
              <IconButton>
                <AddBoxOutlined fontSize="small" onClick={createMemo} />
              </IconButton>
            </Box>
          </ListItemButton>
          {memos.map((item: any, index: number) => (
            <ListItemButton
              sx={{ pl: "20px" }}
              component={Link}
              to={`memo/${item._id}`}
              key={item._id}
              selected={index === activeIndex}
            >
              <Typography className='overflow-hidden'>
                {item.icon}
                {item.title}
              </Typography>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
  )
}
export default SideBar
