import { forwardRef } from "react";
import { IRole } from "../../models/role";

interface IProps {
  role: IRole;
}

const RoleCard = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const { role } = props;
  return (
    <div ref={ref} className="flex flex-col gap-1 items-center justify-between w-64 h-96 p-6 bg-indigo-900 text-gray-200 font-serif text-xl">
      <h1 className="font-bold text-2xl">{role.name}</h1>
      <img src={`https://picsum.photos/seed/${role.name}/200`} alt={role.name} />
      <h3 className="italic">{role.privilege}</h3>
    </div>
  );
});

export default RoleCard;