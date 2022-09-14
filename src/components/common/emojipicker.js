import { Box, Typography } from "@mui/material"
import Picker from "@emoji-mart/react"
import { useEffect, useState } from "react"

const EmojiPicker = ({ icon, onIconChange }) => {
  const [selectedEmoji, setSelectedEmoji] = useState()
  const [isShowPicker, setIsShowPicker] = useState(false)

  useEffect(() => {
    setSelectedEmoji(icon)
  }, [icon])

  const showPicker = () => setIsShowPicker(!isShowPicker)

  const selectEmoji = (e) => {
    const emojiCode = e.unified.split("-")
    // console.log(emojiCode)
    let codesArray = []
    emojiCode.forEach((el) => codesArray.push("0x" + el))
    const emoji = String.fromCodePoint(...codesArray)
    // console.log(emoji)
    setTimeout(() => {
      setIsShowPicker(false)
    }, 0)
    onIconChange(emoji)
  }

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight="700"
        sx={{ cursor: "pointer" }}
        onClick={showPicker}
      >
        {icon}
      </Typography>
      <Box
        sx={{
          display: isShowPicker ? "block" : "none",
          position: "absolute",
          zIndex: "100",
        }}
      >
        <Picker onEmojiSelect={selectEmoji} />
      </Box>
    </Box>
  )
}
export default EmojiPicker
