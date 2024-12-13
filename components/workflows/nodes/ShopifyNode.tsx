import { Store, TrendingUp } from "lucide-react";
import { NodeWrapper } from "./NodeWrapper";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function ShopifyNode({ data }: { data: { label: string } }) {
  const [profit, setProfit] = useState(0);

  const calculateProfit = (revenue: number, cost: number) => {
    const calculatedProfit = revenue - cost;
    setProfit(calculatedProfit);
  };

  return (
    <NodeWrapper label={data.label} icon={Store} inputs={2} outputs={2}>
      <div className="space-y-2">
        <Input type="text" placeholder="Product Name" />
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Revenue"
            onChange={(e) =>
              calculateProfit(
                Number(e.target.value),
                profit + Number(e.target.value)
              )
            }
          />
          <Input
            type="number"
            placeholder="Cost"
            onChange={(e) =>
              calculateProfit(
                profit + Number(e.target.value),
                Number(e.target.value)
              )
            }
          />
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span>Profit: ${profit.toFixed(2)}</span>
        </div>
      </div>
    </NodeWrapper>
  );
}
