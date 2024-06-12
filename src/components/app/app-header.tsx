import { Group, Image, useMantineTheme } from "@mantine/core";
import Link from "next/link";
import classes from '../../styles/AppHeader.module.scss';

export const AppHeader = () => {
  const theme = useMantineTheme();

  const navLinks = [
    { label: 'Dashboard', link: '/' },
  ]

  const links = navLinks.map((v, k) => <Link key={k} href={v.link} className={classes.link}>
    {v.label}
  </Link>)

  return <header className={classes.header}>
    <Group align="center" justify="space-between" px={10} py={5}>
      <Group align="center" gap='lg'>
        <Link href={'/'}>
          <Image src={'/logo.svg'} w={156} alt="logo" />
        </Link>

        {links}
      </Group>
    </Group>
  </header>
}