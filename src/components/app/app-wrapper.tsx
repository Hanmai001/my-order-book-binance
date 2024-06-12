'use client'

import { AppShell, Box } from "@mantine/core";
import { FC, PropsWithChildren } from "react";
import { AppHeader } from "./app-header";
import { APP_CONFIG_UI } from "@/modules/configs";

export const AppWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <AppShell
    header={{ height: 63 }}
  >
    <AppShell.Header style={{ zIndex: 100 }}>
      <AppHeader />
    </AppShell.Header>

    <AppShell.Main
      bg="#f8f9fe"
    >
      <Box
        m='auto'
        p={20}
        maw={APP_CONFIG_UI.mainContentWidth}

      >
        {children}
      </Box>
    </AppShell.Main>
  </AppShell>
}