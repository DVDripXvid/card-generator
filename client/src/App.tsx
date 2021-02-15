import { useCallback, useEffect, useRef, useState } from "react";
import AdventurerCard from "./components/cards/AdventurerCard";
import { IAdventurer } from "./models/adventurer";
import sheetService from "./services/sheetService";
import domtoimage from 'dom-to-image';
import cloudinaryService, { cloudinaryContentRoot } from "./services/cloudinaryService";
import Button from "./components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [adventurers, setAdventurers] = useState<IAdventurer[]>([]);
  const [csvData, setCsvData] = useState('');
  const cardRefs = useRef<Record<string, HTMLDivElement>>({});
  const [isUploading, setIsUploading] = useState(false);

  const getAdventurers = useCallback(
    () => {
      cardRefs.current = {};
      sheetService.getAdventurers().then(setAdventurers);
    },
    [setAdventurers],
  );

  useEffect(
    () => { getAdventurers(); },
    [getAdventurers],
  );

  useEffect(
    () => {
      const rows = [['label', 'image']];
      adventurers
        .map(a => [a.name, `${cloudinaryContentRoot}/adventurers/${a.id}`])
        .forEach(item => rows.push(item));

      let csvContent = "data:text/csv;charset=utf-8,";

      rows.forEach(function (rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
      });

      setCsvData(csvContent);
    },
    [adventurers, setCsvData]
  )

  const updateAll = useCallback(
    () => {
      setIsUploading(true);
      const promises = Object.entries(cardRefs.current).map(([id, ref]) => {
        return domtoimage.toJpeg(ref)
          .then(dataUri => cloudinaryService.uploadImage(dataUri, `adventurers/${id}`))
      });
      Promise.allSettled(promises).then(() => setIsUploading(false));
    },
    []
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-5 p-5 bg-purple-500 text-white">
        <a
          className="hover:underline"
          href="https://docs.google.com/spreadsheets/d/1ianY6azMlWc9EYeFLOY8hAABJK7j8ohODm1RfU2n3pQ"
          target="_blank"
          rel="noopener noreferrer">Open Google Sheet</a>
        <Button onClick={getAdventurers} text="Refresh cards" />
        <a download="adventurers_deck.csv" href={csvData}>
          <Button onClick={getAdventurers} text="Generate csv" />
        </a>
        <Button onClick={updateAll} text="Upload all" />
        {isUploading && <FontAwesomeIcon icon={faCircleNotch} spin />}
      </div>
      <div className="flex flex-row flex-wrap gap-3 p-3">
        {adventurers.map(a => (<AdventurerCard key={a.id} ref={ref => { if (ref) { cardRefs.current[a.id] = ref; } }} adventurer={a} />))}
      </div>
    </div >
  );
}

export default App;