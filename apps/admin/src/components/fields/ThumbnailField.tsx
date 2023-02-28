import { CSSProperties, useState } from "react";
import { RaRecord, useRecordContext } from "react-admin";
import { env } from "~/utils/env";

export const ThumbnailField = (p: {
  source: keyof RaRecord;
  label?: string;
}) => {
  const record = useRecordContext();
  const initialHeight = 50;
  const initialzIndex = 0;
  const initialPosition: CSSProperties["position"] = "static";

  const [height, setHeight] = useState(initialHeight);
  const [zIndex, setZIndex] = useState(initialzIndex);
  const [position, setPosition] =
    useState<CSSProperties["position"]>(initialPosition);

  const onMouseEnter = () => {
    setHeight(200);
    setZIndex(5);
    setPosition("absolute");
  };

  const onMouseLeave = () => {
    setHeight(initialHeight);
    setZIndex(initialzIndex);
    setPosition(initialPosition);
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "relative",
        height: initialHeight,
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
