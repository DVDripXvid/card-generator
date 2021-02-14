import { useCallback, useEffect, useRef, useState } from "react";
import AdventurerCard from "./components/cards/AdventurerCard";
import { IAdventurer } from "./models/adventurer";
import sheetService from "./services/sheetService";
import domtoimage from 'dom-to-image';
import cloudinaryService from "./services/cloudinaryService";

function App() {
  const [adventurers, setAdventurers] = useState<IAdventurer[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(
    () => { sheetService.getAdventurers().then(setAdventurers); },
    []
  );

  const convertToImage = useCallback(
    () => {
      if (cardRef.current) {
        domtoimage.toPng(cardRef.current)
          .then(dataUri => cloudinaryService.uploadImage(dataUri, 'adventurers/1'))
          .then(console.log);
      }
    },
    [],
  );

  sheetService.getAdventurerProperties().then(console.log);

  return (
    <div>
      <a
        href="https://docs.google.com/spreadsheets/d/1ianY6azMlWc9EYeFLOY8hAABJK7j8ohODm1RfU2n3pQ"
        target="_blank"
        rel="noopener noreferrer">Sheet</a>
      <div className="flex flex-row gap-5 items-center">
        {adventurers.length > 0 && <AdventurerCard ref={cardRef} adventurer={adventurers[0]} />}
        <button onClick={convertToImage}>Convert & Upload</button>
      </div>
    </div>
  );
}

export default App;