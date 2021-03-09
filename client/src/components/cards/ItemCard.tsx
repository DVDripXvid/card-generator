import { forwardRef } from "react";
import { IItem } from "../../models/item";

interface IProps {
  item: IItem;
}

const ItemCard = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const { item } = props;
  return (
    <div ref={ref} className="flex flex-col gap-1 items-center justify-around w-64 h-96 p-6 bg-green-200 text-blue-900 font-serif text-xl">
      <h1 className="font-bold text-2xl">{item.name}</h1>
      <h2 className="font-bold">{item.cast}</h2>
      <div>{item.story}</div>
    </div>
  );
});

export default ItemCard;