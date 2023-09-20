import { BackwardsButton,
         ForwardButton,
         DrawerMenuButton, } from '#@/components/Buttons/NavButtons';
import { HomeButton } from '#@/components/Buttons/server-buttons';
import TopBar from '#@/components/layout/top-bar';
import InputSearchBar from 'components/layout/search/InputSearchBar';

export default function Page(
            {
                            params 
            }: { params: { all: string[] } } 
) {
  return (
    <TopBar>
      {params.all.map(
                  (
                      rt, i 
                  ) => {
                        return <p key={i}>{rt}</p>;
                  } 
      )}
      <DrawerMenuButton />
      <HomeButton />
      <InputSearchBar />
      <BackwardsButton />
      <ForwardButton />
    </TopBar>
  );
}
