import { forwardRef } from "react";
import { ISpell } from "../../models/spell";

interface IProps {
  spell: ISpell;
}

const SpellCard = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const { spell } = props;
  return (
    <div ref={ref} className="flex flex-col gap-1 items-center justify-around w-64 h-96 p-6 bg-red-200 text-blue-900 font-serif text-xl">
      <h1 className="font-bold text-2xl">{spell.name}</h1>
      <div>{spell.story}</div>
    </div>
  );
});

export default SpellCard;