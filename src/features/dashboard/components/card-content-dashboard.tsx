import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { formatPriceToIdr } from "@/utils";

interface CardContentProps {
  data: {
    title: string;
    contentCard: number;
    iconCard: ReactNode;
    linkDetail: string;
  };
}

export const CardContentDashboard = ({
  data
}: CardContentProps) => {
  return (
    <Card className="w-full relative overflow-hidden">
      <CardHeader>
        <CardTitle className="text-gray-500 text-base font-semibold">
          {data.title}
        </CardTitle>
        <CardContent className="-p-3">
          <span className="w-full font-bold text-gray-800 text-3xl">
            {data.title === "Jumlah Pendapatan"
              ? formatPriceToIdr(data.contentCard)
              : data.contentCard}
          </span>
        </CardContent>
      </CardHeader>
      <div className="absolute text-gray-400 -top-3 -right-8 opacity-20 z-0">
        {data.iconCard}
      </div>
      <Link href={data.linkDetail}>
        <CardFooter className="bg-gray-500 w-full py-3 relative z-10">
          <div className="flex justify-center items-center text-center space-x-1">
            <span className="text-white text-sm">Lihat Detail</span>
            <ChevronRight
              size={16}
              className="text-white"
            />
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};
