import hasRole from "@/utils/authentication/hasRole";
import Card from "@/components/others/Card/Card";
import CardRowLink from "@/components/others/Card/CardRowLink";
import ROUTER_LINKS from "@/constances/routerLinks";
import {AdminClassResponseType} from "@/components/pages/admin-panel/classes/AdminPanelClasses.types";


type Props = {
  cityName: AdminClassResponseType['city']['name'];
} & Pick<AdminClassResponseType, 'id' | 'name'>

function AdminClassCard(
  {id, name, cityName}: Props
) {
  return (
    <Card className='gap-2'>
      <div className='flex items-center justify-between'>
        <span className='text-lg font-medium pb-1'>
          {name}
        </span>

        {hasRole('ADMIN') && (
          <span className='text-gray-500 text-sm'>
            {cityName || ''}
          </span>
        )}
      </div>

      <div className='pt-2 mt-2 border-t border-gray-300'>
        <CardRowLink link={ROUTER_LINKS.ADMIN_PANEL_CLASS_DETAIL(id)}>
          مشاهده و ویرایش
        </CardRowLink>
      </div>
    </Card>
  );
}

export default AdminClassCard;