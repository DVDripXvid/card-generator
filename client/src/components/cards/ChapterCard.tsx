import { forwardRef } from "react";
import { IQuest } from "../../models/quest";

interface IProps {
  quest: IQuest;
}

const ChapterCard = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const { quest } = props;
  return (
    <div ref={ref} className="flex flex-col gap-1 items-center justify-between w-64 h-96 p-6 bg-pink-400 text-blue-900 font-serif">
      <h1 className="font-bold text-xl">{quest.name}</h1>
      <div className="underline">{quest.conditions}</div>
      <div>Fame reward: {quest.fame}</div>
      <div>Gold reward: {quest.gold}</div>
      {quest.penalties && <div>Penalties: {quest.penalties}</div>}
      {quest.rules && <div>Rules: {quest.rules}</div>}
    </div>
  );
});

export default ChapterCard;