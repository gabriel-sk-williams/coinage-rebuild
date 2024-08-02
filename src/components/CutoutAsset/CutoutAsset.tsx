import NextImage, { StaticImageData } from "next/image";

type CutoutAssetProps = {
  image?: StaticImageData;
  videoSrc?: string;
  color?: "blue" | "orange" | "teal" | "offWhite" | "white" | "purple";
  right?: boolean;
  mobile?: boolean;
};
export const CutoutAsset: React.FC<CutoutAssetProps> = ({
  image,
  color,
  videoSrc,
  right = true,
  mobile = false,
}) => {
  const assetClasses = "absolute w-full h-full object-cover";
  return (
    <div className={`relative w-full h-full text-coinage-${color}`}>
      {image && (
        <NextImage
          alt={""}
          src={image}
          className={assetClasses}
          layout="fill"
          objectFit="cover"
        />
      )}
      {videoSrc && !image && (
        <video autoPlay loop muted controls={false} className={assetClasses}>
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {right && (
        <div className={`absolute right-0 top-0 hidden tab:block`}>
        
          <svg viewBox="0 0 20 100" className="w-[101%] h-[101%]">
            <polygon
              points="20,0 20,100 0,100"
              stroke="currentColor"
              fill="currentColor"
            />


          </svg>
        </div>
      )}

      {!right && (

      <div className={`absolute left-0 top-0 hidden tab:block`}>
        
        <svg viewBox="0 0 20 100" className="w-[101%] h-[101%] transform translate-x-[-2px]">
          <polygon
            points="0,0 15,0 0,100"
            stroke="currentColor"
            fill="currentColor"
          />

        </svg>
      </div>
      )}

      {mobile && (

        <div className={`absolute left-0 w-full top-0 tab:hidden`}>
          
          <svg viewBox="0 0 20 100" className="w-[101%] h-[101%] transform translate-y-[-2px]">
            <polygon
              points="0,0 100,0 100,20"
              stroke="currentColor"
              fill="currentColor"
            />

          </svg>
        </div>
      )}
    </div>
  );
};
