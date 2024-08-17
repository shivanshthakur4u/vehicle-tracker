import React from "react";
import { Paper, IconButton, Slider } from "@mui/material";
import { PlayArrow, Pause, FastRewind, FastForward } from "@mui/icons-material";

const PlaybackControls = ({
  isPlaying,
  setIsPlaying,
  currentTime,
  setCurrentTime,
  totalDuration,
  disabled,
}) => {
  return (
    <Paper
      style={{
        position: "absolute",
        bottom: 10,
        left: 10,
        right: 10,
        padding: 10,
        zIndex: 1000,
      }}
    >
      <IconButton
        onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
        disabled={disabled}
      >
        <FastRewind />
      </IconButton>
      <IconButton onClick={() => setIsPlaying(!isPlaying)} disabled={disabled}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <IconButton
        onClick={() =>
          setCurrentTime(Math.min(totalDuration, currentTime + 10))
        }
        disabled={disabled}
      >
        <FastForward />
      </IconButton>
      <Slider
        value={currentTime}
        onChange={(_, newValue) => setCurrentTime(newValue)}
        min={0}
        max={totalDuration}
        style={{ marginTop: 10 }}
        disabled={disabled}
      />
    </Paper>
  );
};

export default PlaybackControls;
