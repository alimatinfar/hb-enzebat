import Card from "@/components/others/Card/Card";
import hasRole from "@/utils/authentication/hasRole";
import {USER_ROLE_LABELS} from "@/components/pages/admin-panel/users/AdminPanelUsers.constances";
import ROUTER_LINKS from "@/constances/routerLinks";
import CardRowLink from "@/components/others/Card/CardRowLink";
import {AdminUserResponseType} from "@/components/pages/admin-panel/users/AdminPanelUsers.types";


type Props = {
  cityName: AdminUserResponseType['city']['name']
} & Pick<AdminUserResponseType, 'id' | 'firstName' | 'lastName' | 'roles'>

function AdminUserCard(
  {id, firstName, lastName, roles, cityName}: Props
) {
  return (
    <Card className='gap-2'>
      <div className='flex items-center justify-between'>
        <span className='text-lg font-medium'>
          {`${firstName} ${lastName}`}
        </span>

        {hasRole('ADMIN') && (
          <span className='text-gray-500 text-sm'>
            {cityName || ''}
          </span>
        )}
      </div>

      <div className='flex items-center gap-x-2 mt-2 text-sm'>
        {roles?.map((role) => USER_ROLE_LABELS[role.role])
          .join(', ')}
      </div>

      <div className='pt-2 mt-2 border-t border-gray-300'>
        <CardRowLink link={ROUTER_LINKS.ADMIN_PANEL_USER_DETAIL(id)}>
          مشاهده و ویرایش
        </CardRowLink>
      </div>
    </Card>
  );
}

export default AdminUserCard;