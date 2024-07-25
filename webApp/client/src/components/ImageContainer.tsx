interface Props {
  imageVis: boolean;
  label: string;
  imgSrc: string;
}

function ImageContainer({ imageVis, label, imgSrc }: Props) {
  return (
    <div className="container mt-4">
      {imageVis && (
        <div className="card border-primary">
          <div className="card-body text-center">
            {label && <p className="card-text">{label}</p>}
            {imgSrc && (
              <img
                src={imgSrc}
                alt="Input image"
                height="400"
                width="400"
                className="img-fluid"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageContainer;
