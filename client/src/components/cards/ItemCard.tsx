import { forwardRef } from "react";
import { IItem, ItemType } from "../../models/item";

interface IProps {
  item: IItem;
}

const colorMap: Record<ItemType, string> = {
  'Gear': 'bg-green-300',
  'Plot': 'bg-purple-300',
  'Tale': 'bg-gray-300',
  'Spell': 'bg-red-300',
};

const ItemCard = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const { item } = props;
  const bgColor = colorMap[item.cast] || 'bg-pink-200';
  return (
    <div ref={ref} className={`flex flex-col gap-1 items-center justify-around w-64 h-96 p-6 ${bgColor} text-blue-900 font-serif text-xl`}>
      <div className="flex flex-row justify-between w-full">
        <div>{item.cost}</div>
        <div>{item.reBuyCost}</div>
      </div>
      <h1 className="font-bold text-2xl">{item.name}</h1>
      <h2 className="font-bold">{item.cast}</h2>
      <div>{item.story}</div>
    </div>
  );
});

export default ItemCard;