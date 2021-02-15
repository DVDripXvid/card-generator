import { forwardRef } from "react";
import { IAdventurer } from "../../models/adventurer";

interface IProps {
  adventurer: IAdventurer;
}

const AdventurerCard = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const { adventurer } = props;
  return (
    <div ref={ref} className="flex flex-col gap-1 items-center justify-between w-48 h-96 p-6 bg-yellow-100 text-red-900 font-serif">
      <h1 className="font-bold text-xl">{adventurer.name}</h1>
      <h2>{adventurer.cast}</h2>
      <div className="flex flex-row justify-around w-full font-bold">
        <div>{adventurer.strength}</div>
        <div>{adventurer.magic}</div>
        <div>{adventurer.dexterity}</div>
      </div>
    </div>
  );
});

export default AdventurerCard;