import { useCallback, useEffect, useRef, useState } from "react";
import Select from 'react-select'
import AdventurerCard from "./components/cards/AdventurerCard";
import { IAdventurer } from "./models/adventurer";
import sheetService from "./services/sheetService";
import domtoimage from 'dom-to-image';
import cloudinaryService, { cloudinaryContentRoot } from "./services/cloudinaryService";
import Button from "./components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { IQuest } from "./models/quest";
import QuestCard from "./components/cards/QuestCard";
import CardItem from "./containers/CardItem";

const cardOptions: { label: string; value: 'adventurers' | 'quests' }[] = [
  {
    label: 'Adventurers',
    value: 'adventurers'
  },
  {
    label: 'Quests',
    value: 'quests'
  },
];

function App() {
  const [selected, setSelected] = useState(cardOptions[0]);
  const [adventurers, setAdventurers] = useState<IAdventurer[]>([]);
  const [quests, setQuests] = useState<IQuest[]>([]);
  const [csvData, setCsvData] = useState('');
  const cardRefs = useRef<Record<string, HTMLDivElement>>({});
  const [isUploading, setIsUploading] = useState(false);

  const getCards = useCallback(
    () => {
      cardRefs.current = {};
      switch (selected.value) {
        case 'adventurers':
          sheetService.getAdventurers().then(setAdventurers);
          break;
        case 'quests':
          sheetService.getQuests().then(setQuests);
          break;
      }
    },
    [selected.value],
  );

  useEffect(
    () => {
      getCards();
    },
    [getCards, selected.value],
  );

  useEffect(
    () => {
      const folder = selected.value;
      let cards: { id: string; name: string }[] = [];
      switch (selected.value) {
        case 'adventurers':
          cards = adventurers;
          break;
        case 'quests':
          cards = quests;
          break;
      }

      const rows = [['label', 'image']];
      cards
        .map(c => [c.name, `${cloudinaryContentRoot}/${folder}/${c.id}`])
        .forEach(item => rows.push(item));

      let csvContent = "data:text/csv;charset=utf-8,";

      rows.forEach(function (rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
      });

      setCsvData(csvContent);
    },
    [adventurers, quests, selected.value, setCsvData]
  )

  const updateAll = useCallback(
    () => {
      setIsUploading(true);
      const promises = Object.entries(cardRefs.current).map(([id, ref]) => {
        return domtoimage.toJpeg(ref)
          .then(dataUri => cloudinaryService.uploadImage(dataUri, `${selected.value}/${id}`))
      });
      Promise.allSettled(promises).then(() => setIsUploading(false));
    },
    [selected.value]
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-5 p-5 bg-purple-500 text-white">
        <a
          className="hover:underline"
          href="https://docs.google.com/spreadsheets/d/1ianY6azMlWc9EYeFLOY8hAABJK7j8ohODm1RfU2n3pQ"
          target="_blank"
          rel="noopener noreferrer">Open Google Sheet</a>
        <div className="w-48 text-purple-900">
          <Select options={cardOptions} value={selected} onChange={val => val && setSelected(val)} />
        </div>
        <Button onClick={getCards} text="Refresh cards" />
        <a download={`${selected.value}_deck.csv`} href={csvData}>
          <Button onClick={() => {/* NO_OP */ }} text="Generate csv" />
        </a>
        <Button onClick={updateAll} text="Upload all" />
        {isUploading && <FontAwesomeIcon icon={faCircleNotch} spin />}
      </div>
      <div className="flex flex-row flex-wrap gap-3 p-3">
        {selected.value === 'adventurers' && adventurers.map(a => (
          <CardItem key={a.id} card={a} element={cardRefs.current[a.id]} uploadFolder={selected.value} >
            <AdventurerCard key={a.id} ref={ref => { if (ref) { cardRefs.current[a.id] = ref; } }} adventurer={a} />
          </CardItem>
        ))}
        {selected.value === 'quests' && quests.map(q => (
          <CardItem key={q.id} card={q} element={cardRefs.current[q.id]} uploadFolder={selected.value} >
            <QuestCard key={q.id} ref={ref => { if (ref) { cardRefs.current[q.id] = ref; } }} quest={q} />
          </CardItem>
        ))}
      </div>
    </div >
  );
}

export default App;