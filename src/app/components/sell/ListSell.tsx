import { Sell } from "@/types/types";
import React, { useMemo } from "react";

interface ListSellTableProps{
    sells: Sell[]
}
const ListSell:React.FC<ListSellTableProps> = ({sells}) => {

    const countSell = useMemo(()=> sells.length,[sells])

  return (
    <div>
       <p className="font-bold text-white mb-2">تعداد محصولات ثبت شده{countSell}</p>
    </div>
  );
};

export default ListSell;
