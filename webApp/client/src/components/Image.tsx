interface Props {
  src: string;
  width?: number;
  height?: number;
}

const Image = ({src, width=300, height=500}: Props) => {
  const factor = 10;
  const x = width/factor, y = height/factor;
  return (
      <>
          {/* <h1>My Image</h1> */}
          <p>This is an image component {src}</p>
          <img src={src} alt="A descriptive text about the image" width={String(x)} height={String(y)} />
      </>
  );
}

export default Image;
