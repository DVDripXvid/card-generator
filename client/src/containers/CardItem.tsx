import { faCircleNotch, faExternalLinkAlt, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useCallback, useState } from "react";
import domtoimage from 'dom-to-image';
import cloudinaryService, { cloudinaryContentRoot } from "../services/cloudinaryService";
import { ICard } from "../models/card";


interface IProps {
  card: ICard;
  uploadFolder: string;
  element: HTMLDivElement;
}

const CardItem: FC<IProps> = (props) => {
  const { card, uploadFolder, element, children } = props;
  const [isUploading, setIsUploading] = useState(false);

  const upload = useCallback(
    () => {
      setIsUploading(true);
      domtoimage.toJpeg(element)
        .then(dataUri => cloudinaryService.uploadImage(dataUri, `${uploadFolder}/${card.id}`))
        .then(() => setIsUploading(false));
    },
    [card.id, element, uploadFolder],
  );

  return (
    <div className="flex flex-col gap-2">
      {children}
      <div className="flex flex-row justify-around text-purple-900">
        {isUploading
          ? <FontAwesomeIcon icon={faCircleNotch} spin />
          : <FontAwesomeIcon className="hover:text-purple-700" onClick={upload} title="Upload" icon={faUpload} role="button" />
        }
        <a title="Open in new tab" target="_blank" rel="noopener noreferrer" href={`${cloudinaryContentRoot}/${uploadFolder}/${card.id}`}>
          <FontAwesomeIcon className="hover:text-purple-700" icon={faExternalLinkAlt} role="button" />
        </a>
      </div>
    </div>
  )
};

export default CardItem;