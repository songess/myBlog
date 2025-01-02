'use client';

import { Log } from '@/type/type';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

interface LogContentProps {
  logs: Log[];
}

interface GroupedLogs {
  [year: string]: {
    [month: string]: Log[];
  };
}

export default function LogContent({ logs }: LogContentProps) {
  const router = useRouter();

  // Group logs by year and month
  const groupedLogs = logs.reduce((acc: GroupedLogs, log) => {
    const year = dayjs(log.date).format('YYYY');
    const month = dayjs(log.date).format('MM');

    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(log);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(groupedLogs).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Archive</h1>
      <Accordion type="single" collapsible className="w-full">
        {sortedYears.map((year) => (
          <AccordionItem key={year} value={year}>
            <AccordionTrigger className="text-xl font-semibold hover:no-underline">
              {year}년
            </AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 w-24">날짜</th>
                      <th className="text-left py-2 px-4">제목</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(groupedLogs[year])
                      .sort((a, b) => Number(b) - Number(a))
                      .map((month) => (
                        <>
                          <tr className="bg-gray-50">
                            <td
                              colSpan={2}
                              className="py-2 px-4 font-medium text-gray-600"
                            >
                              {month}월
                            </td>
                          </tr>
                          {groupedLogs[year][month]
                            .sort(
                              (a, b) =>
                                dayjs(b.date).valueOf() -
                                dayjs(a.date).valueOf()
                            )
                            .map((log) => (
                              <tr
                                key={log.id}
                                className="hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                                onClick={() => router.push(`/log/${log.id}`)}
                              >
                                <td className="py-2 px-4 text-gray-500">
                                  {dayjs(log.date).format('MM.DD')}
                                </td>
                                <td className="py-2 px-4">{log.title}</td>
                              </tr>
                            ))}
                        </>
                      ))}
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
