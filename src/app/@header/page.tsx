import { BackwardsButton,
         ForwardButton,
         DrawerMenuButton, } from '#@/components/Buttons/NavButtons';
import { HomeButton } from '#@/components/Buttons/server-buttons';
import TopBar from '#@/components/layout/top-bar';

export default function Page() {
  return (
    <TopBar>
      <BackwardsButton />
      <ForwardButton />
    </TopBar>
  );
}
