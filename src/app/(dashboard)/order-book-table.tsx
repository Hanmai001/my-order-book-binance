import { Title, Stack, ScrollArea, Table, Skeleton, useMantineTheme } from "@mantine/core";
import classes from './page.module.scss';
import { FC } from "react";

interface OrderBookTableProps {
  title: string;
  data: any[];
  decimals: string;
  maxQuantity: number;
}

export const OrderBookTable: FC<OrderBookTableProps> = ({ title, data, decimals }) => {
  const theme = useMantineTheme();
  const calculateTotalQuantity = (orders: any[]): number => {
    let total = 0;
    for (const order of orders) {
      total += Number(order[1]);
    }
    return total;
  };

  //Sum money for each price
  const calculateSum = (array: any[]) => {
    return array.reduce((total, item) => total + Number(item[0]) * Number(item[1]), 0);
  };

  return (
    <Stack gap='xs'>
      <Title order={4} fw={500} c={title === 'Buy order (Bid prices)' ? 'teal' : 'red'}>{title}</Title>

      <ScrollArea h={493} className={classes.tableWrapper}>
        <Table
          horizontalSpacing="lg"
          verticalSpacing="sm"
          bg={theme.white}
          classNames={classes}>
          <Table.Thead className={classes.headTable}>
            <Table.Tr>
              <Table.Th>Price (USDT)</Table.Th>
              <Table.Th>Size (BCT)</Table.Th>
              <Table.Th>Sum (USDT)</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {function () {
              if (!data) return <Skeleton h={500} />
              const maxQuantity = calculateTotalQuantity(data)

              return <>
                {data.map((item, index) => {
                  // console.log(maxQuantity)
                  const calculatedPercentage = item[1] / maxQuantity * 100;
                  return <Table.Tr
                    className={classes.rowOrder}
                    key={index}
                    style={{ '--percentage': `${calculatedPercentage}%`, '--bg-color': title === 'Buy order (Bid prices)' ? 'rgba(56, 184, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)' }}
                  >
                    <Table.Td c={title === 'Buy order (Bid prices)' ? 'teal' : 'red'} fw={500}>{Number(item[0]).toFixed((Number(decimals)))}</Table.Td>
                    <Table.Td>{item[1]}</Table.Td>
                    <Table.Td>{Number(calculateSum(data.slice(0, index + 1))).toFixed(7)}</Table.Td>
                  </Table.Tr>
                })}
              </>
            }()}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Stack>
  );
};