import { CSSProperties, useState } from "react";
import { RaRecord, useRecordContext } from "react-admin";
import { env } from "~/utils/env";

const INITIAL_HEIGHT = 50;
const INITIAL_Z_INDEX = 0;
const INITIAL_POSITION: CSSProperties["position"] = "static";

export const ThumbnailField = (p: {
  source: keyof RaRecord;
  label?: string;
}) => {
  const record = useRecordContext();

  const [height, setHeight] = useState(INITIAL_HEIGHT);
  const [zIndex, setZIndex] = useState(INITIAL_Z_INDEX);
  const [position, setPosition] =
    useState<CSSProperties["position"]>(INITIAL_POSITION);

  const onMouseEnter = () => {
    setHeight(200);
    setZIndex(5);
    setPosition("absolute");
  };

  const onMouseLeave = () => {
    setHeight(INITIAL_HEIGHT);
    setZIndex(INITIAL_Z_INDEX);
    setPosition(INITIAL_POSITION);
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "relative",
        height: INITIAL_HEIGHT,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        style={{
          position: position,
          objectFit: "contain",
          height,
          zIndex,
        }}
        src={`${env.VITE_IMAGE_URL}/${record[p.source]}`}
      />
    </div>
  );
};
