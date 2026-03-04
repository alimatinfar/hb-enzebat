import PageTitle from "@/components/others/PageTitle/PageTitle";
import AdminClassCard, {AdminClassCardProps} from "@/components/pages/admin-panel/classes/AdminClassCard";

type Props = {
  title: string;
  classes: AdminClassCardProps[];
}

function AdminUserDetailClasses(
  {title, classes}: Props
) {
  return (
    <div className='py-2'>
      <PageTitle small>
        {title}
      </PageTitle>

      <div className='flex flex-col gap-y-4'>
        {classes.map(item => (
          <AdminClassCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default AdminUserDetailClasses;