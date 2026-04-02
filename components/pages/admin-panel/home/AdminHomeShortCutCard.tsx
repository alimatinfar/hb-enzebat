import Card from "@/components/others/Card/Card";
import RenderLogic, {RenderLogicProps} from "@/components/others/RenderLogic/RenderLogic";
import Skeleton from "@/components/others/Skeleton/Skeleton";
import CardRowLink from "@/components/others/Card/CardRowLink";
import {IconFunctionType} from "@/types/IconPropsType";
import hasRole from "@/utils/authentication/hasRole";


export type AdminHomeShortCutCardProps = {
  title: string;
  lastTitle?: string;
  link: string;
  items: {
    id: string | number;
    name: string;
    cityName: string;
  }[];
  RowIcon: IconFunctionType;
}

function AdminHomeShortCutCard(
  {title, lastTitle, isLoading, error, RowIcon, link, items}: AdminHomeShortCutCardProps
) {
  return (
    <Card>
      <p className='font-semibold text-gray-600 text-center text-sm pb-2'>
        {`آخرین ${lastTitle || title} افزوده شده`}
      </p>

      <div className='flex flex-col border-b border-gray-300 mb-2 pb-2'>
        <RenderLogic
          isLoading={isLoading} error={error} renderLogicDefaultContainerMinHeight='min-h-auto'
          loadingElement={(
            <div className='flex flex-col w-full'>
              {[1, 2, 3].map((_, index) => (
                <div key={index} className='h-10 w-full py-2'>
                  <Skeleton size='h-full w-full' bgClass='bg-gray-2'/>
                </div>
              ))}
            </div>
          )}
        >
          {items.map((item) => (
            <div key={item.id} className='py-2 flex items-center justify-between'>
              <div className='flex items-center gap-x-1'>
                <RowIcon textColor='text-gray-600' width={14} height={14}/>
                <span>
                  {item.name}
                </span>
              </div>

              {hasRole('ADMIN') && (
                <span className='text-gray-500 text-sm'>
                  {item.cityName}
                </span>
              )}
            </div>
          ))}
        </RenderLogic>
      </div>

      <CardRowLink link={link}>
        {`مشاهده همه ${title}`}
      </CardRowLink>
    </Card>
  );
}

export default AdminHomeShortCutCard;