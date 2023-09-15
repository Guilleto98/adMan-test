import React from "react";
import { ListItem, Text } from "@chakra-ui/react";

interface TrackListItemProps {
  trackName: string,
  trackDuration: number,
  trackIndex: number,
  formatDuration: (duration: number)=> string
}

const TrackListItem: React.FC<TrackListItemProps> = ({
  trackName,
  trackDuration,
  trackIndex,
  formatDuration
}) => {
  return (
    <ListItem key={trackIndex}>
      <Text>{trackName}</Text>
      <Text fontSize="lg" color="white">
        Duración: {formatDuration(trackDuration)}
      </Text>
    </ListItem>
  );
};

export default TrackListItem;
