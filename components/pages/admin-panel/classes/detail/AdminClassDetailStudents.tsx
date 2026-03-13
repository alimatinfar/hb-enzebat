import PageTitle from "@/components/others/PageTitle/PageTitle";
import AdminUserCard, {AdminUserCardProps} from "@/components/pages/admin-panel/users/AdminUserCard";


type Props = {
  students: AdminUserCardProps[]
}

function AdminClassDetailStudents(
  {students}: Props
) {
  return (
    <div className='py-2'>
      <PageTitle small>
        دانش آموزان
      </PageTitle>

      <div className='flex flex-col gap-y-4'>
        {students.map(item => (
          <AdminUserCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default AdminClassDetailStudents;