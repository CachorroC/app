import { BackwardsButton,
         ForwardButton, } from '#@/components/Buttons/NavButtons';
import TopBar from '#@/components/layout/top-bar';

export default function Page() {
  return (
    <TopBar>
      <BackwardsButton />
      <ForwardButton />
    </TopBar>
  );
}
