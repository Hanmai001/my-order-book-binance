'use client'

import { useOrderBookData } from '@/modules/order-book/hooks';
import { Decimals, Depth } from '@/modules/order-book/types';
import { ActionIcon, Group, Image, Select, Stack, Text, Title, Tooltip, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { OrderBookTable } from './order-book-table';

export const OrderBookSection = () => {
  const [selectedDecimals, setSelectedDecimals] = useState<string | null>(Decimals.TWO);
  const [selectedDepth, setSelectedDepth] = useState<string | null>(Depth.FIFTHTEEN);
  const [selectedTable, setSelectedTable] = useState(1);
  const theme = useMantineTheme();
  const { bids, asks, spread, isIncreased, maxQuantity } = useOrderBookData(selectedDepth);

  return (
    <Stack>
      <Group my={10} justify="space-between" visibleFrom="sm">
        <Stack gap={0}>
          <Title order={2} fw={500}>Order Book</Title>
          <Title order={5} fw={500} c={theme.colors.primary[1]}>BCT/USDT</Title>
        </Stack>

        <Group>
          <Select
            label="Depth"
            checkIconPosition="right"
            data={Object.values(Depth).map((v) => ({ value: v, label: v }))}
            value={selectedDepth}
            onChange={(val) => setSelectedDepth(val)}
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
            styles={{
              label: {
                fontSize: '13px',
                marginBottom: '6px',
                color: theme.colors.gray[7]
              },
              option: {
                fontSize: '13px',
                padding: '12px 8px'
              }
            }}
          />
          <Select
            label="Decimals"
            checkIconPosition="right"
            data={Object.values(Decimals).map((v) => ({ value: v, label: `${v} Decimals` }))}
            value={selectedDecimals}
            onChange={(val) => setSelectedDecimals(val)}
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
            styles={{
              label: {
                fontSize: '13px',
                marginBottom: '6px',
                color: theme.colors.gray[7]
              },
              option: {
                fontSize: '13px',
                padding: '12px 8px'
              }
            }}
          />
        </Group>
      </Group>

      <Stack my={10} justify="space-between" hiddenFrom="sm">
        <Stack gap={0} align="center">
          <Title order={2} fw={500}>Order Book</Title>
          <Title order={5} fw='normal' c={theme.colors.primary[1]}>BCT/USDT</Title>
        </Stack>

        <Group grow>
          <Select
            label="Depth"
            checkIconPosition="right"
            data={Object.values(Depth).map((v) => ({ value: v, label: v }))}
            value={selectedDepth}
            onChange={(val) => setSelectedDepth(val)}
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
            styles={{
              label: {
                fontSize: '13px',
                marginBottom: '6px',
                color: theme.colors.gray[7]
              },
              option: {
                fontSize: '13px',
                padding: '12px 8px'
              }
            }}
          />
          <Select
            label="Decimals"
            checkIconPosition="right"
            data={Object.values(Decimals).map((v) => ({ value: v, label: `${v} Decimals` }))}
            value={selectedDecimals}
            onChange={(val) => setSelectedDecimals(val)}
            comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
            styles={{
              label: {
                fontSize: '13px',
                marginBottom: '6px',
                color: theme.colors.gray[7]
              },
              option: {
                fontSize: '13px',
                padding: '12px 8px'
              }
            }}
          />
        </Group>
      </Stack>

      <Group justify="space-between">
        <Group gap={6}>
          <Tooltip label="Order book">
            <ActionIcon variant="transparent" onClick={() => setSelectedTable(1)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 16 16" fill="none">
                <path d="M2.66663 2.66699L7.33329 2.66699L7.33329 7.33366L2.66663 7.33366L2.66663 2.66699Z" fill="red"></path>
                <path d="M2.66663 8.66699L7.33329 8.66699L7.33329 13.3337L2.66663 13.3337L2.66663 8.66699Z" fill="teal"></path>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.66663 2.66699L13.3333 2.66699L13.3333 5.33366L8.66663 5.33366L8.66663 2.66699ZM8.66663 6.66699L13.3333 6.66699L13.3333 9.33366L8.66663 9.33366L8.66663 6.66699ZM13.3333 10.667L8.66663 10.667L8.66663 13.3337L13.3333 13.3337L13.3333 10.667Z" fill={theme.colors.gray[5]}></path>
              </svg>
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Buy order only">
            <ActionIcon variant="transparent" onClick={() => setSelectedTable(2)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 16 16" fill="none">
                <g>
                  <path d="M2.66663 2.66699L7.33329 2.66699L7.33329 13.3337L2.66663 13.3337L2.66663 2.66699Z" fill="teal"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.66663 2.66699L13.3333 2.66699L13.3333 5.33366L8.66663 5.33366L8.66663 2.66699ZM8.66663 6.66699L13.3333 6.66699L13.3333 9.33366L8.66663 9.33366L8.66663 6.66699ZM13.3333 10.667L8.66663 10.667L8.66663 13.3337L13.3333 13.3337L13.3333 10.667Z" fill={theme.colors.gray[5]}></path>
                </g>
              </svg>
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Sell order only">
            <ActionIcon variant="transparent" onClick={() => setSelectedTable(3)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 16 16" fill="none">
                <g>
                  <path d="M2.66663 2.66699L7.33329 2.66699L7.33329 13.3337L2.66663 13.3337L2.66663 2.66699Z" fill="red"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M8.66663 2.66699L13.3333 2.66699L13.3333 5.33366L8.66663 5.33366L8.66663 2.66699ZM8.66663 6.66699L13.3333 6.66699L13.3333 9.33366L8.66663 9.33366L8.66663 6.66699ZM13.3333 10.667L8.66663 10.667L8.66663 13.3337L13.3333 13.3337L13.3333 10.667Z" fill={theme.colors.gray[5]}></path>
                </g>
              </svg>
            </ActionIcon>
          </Tooltip>
        </Group>

        <Group gap={4}>
          <Text size="13px" c={theme.colors.gray[7]}>(spread)</Text>
          <Text c={isIncreased ? 'teal' : 'red'} size="28px">{spread}</Text>
          <Image src={isIncreased ? '/images/icons/arrow-up.png' : '/images/icons/arrow-down.png'} w={24} />
        </Group>
      </Group>

      <Group grow visibleFrom="sm">
        {selectedTable !== 3 && <OrderBookTable title="Buy order (Bid prices)" data={bids} decimals={selectedDecimals!} maxQuantity={maxQuantity} />}
        {selectedTable !== 2 && <OrderBookTable title="Sell order (Ask prices)" data={asks} decimals={selectedDecimals!} maxQuantity={maxQuantity} />}
      </Group>

      <Stack hiddenFrom="sm" gap='lg'>
        {selectedTable !== 3 && <OrderBookTable title="Buy order (Bid prices)" data={bids} decimals={selectedDecimals!} maxQuantity={maxQuantity} />}
        {selectedTable !== 2 && <OrderBookTable title="Sell order (Ask prices)" data={asks} decimals={selectedDecimals!} maxQuantity={maxQuantity} />}
      </Stack>
    </Stack>
  );
};