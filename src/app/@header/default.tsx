import { BackwardsButton,
         ForwardButton,
         DrawerMenuButton, } from '#@/components/Buttons/NavButtons';
import { HomeButton } from '#@/components/Buttons/server-buttons';
import TopBar from '#@/components/layout/top-bar';
import InputSearchBar from 'components/layout/search/InputSearchBar';

export default function Default() {
  return (
    <TopBar>
      <HomeButton />
      <BackwardsButton />
      <InputSearchBar />
      <ForwardButton />
      <DrawerMenuButton />
    </TopBar>
  );
}
