import { forwardRef } from "react";
import { IAdventurer } from "../../models/adventurer";

interface IProps {
  adventurer: IAdventurer;
}

const AdventurerCard = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const { adventurer } = props;
  return (
    <div ref={ref} className="flex flex-col gap-1 items-center justify-between w-64 h-96 p-6 bg-yellow-100 text-red-900 font-serif text-xl">
      <div className="flex flex-row justify-between w-full">
        <div>{adventurer.cost}</div>
        <div>{adventurer.reBuyCost}</div>
      </div>
      <h1 className="font-bold text-2xl">{adventurer.name}</h1>
      <h2>{adventurer.cast}</h2>
      {adventurer.story && <h3 className="italic">{adventurer.story}</h3>}
      <div className="flex flex-row justify-around w-full font-bold">
        <div>{adventurer.strength}</div>
        <div>{adventurer.magic}</div>
      </div>
    </div>
  );
});

export default AdventurerCard;