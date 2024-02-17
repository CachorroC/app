
import { ForwardBackwardNavButtons } from '#@/components/Buttons/nav-buttons';
import { InputSearchBar } from '#@/components/layout/InputSearchBar';
import getCarpetas from '#@/lib/project/utils/Carpetas/getCarpetas';

export default async function Default() {
      const carpetas = await getCarpetas();
      return (
        <>
          <InputSearchBar carpetas={ carpetas} />
          <ForwardBackwardNavButtons />
        </>
      );
}
