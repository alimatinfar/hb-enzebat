'use client'

import React, {useMemo} from 'react';
import PanelLayout from "@/components/layouts/PanelLayout";
import PageTitle from "@/components/others/PageTitle/PageTitle";
import RenderLogic from "@/components/others/RenderLogic/RenderLogic";
import ReportCard from "@/components/others/Card/ReportCard";
import Card from "@/components/others/Card/Card";
import CardRowLink from "@/components/others/Card/CardRowLink";
import Chips from "@/components/others/Chips/Chips";
import Button from "@/components/Form/Button/Button";
import LogoutIcon from "@/components/svg/LogoutIcon";
import Modal from "@/components/others/Modal/Modal";
import YesNoButtonsModal from "@/components/others/Modal/YesNoButtonsModal";
import {KeyValueProps} from "@/components/others/KeyValue/KeyValue";
import useModalOpenBoolean from "@/hooks/modal/useModalOpenBoolean";
import useFetchData from "@/request/hooks/useFetchData";
import useLogout from "@/request/hooks/useLogout";
import APIES from "@/request/constances/apies";
import {PANELS} from "@/constances/panels";
import {USER_ROLE_LABELS} from "@/constances/userRoleLabels";
import {
  ProfileResponseType, ProfileUserType
} from "@/components/pages/profile/Profile.types";

function ProfilePage() {

  const {
    data, isFetching, error
  } = useFetchData<ProfileResponseType>({
    axiosConfig: {
      url: APIES.AUTH_ME
    },
    disableThrowErrorToast: true
  })

  const user: ProfileUserType | undefined = data?.user

  const infoKeyValues: KeyValueProps[] = useMemo(function () {
    if (!user) return []

    return [
      {title: 'شناسه', value: user.id},
      {title: 'نام', value: user.firstName || '—'},
      {title: 'نام خانوادگی', value: user.lastName || '—'},
      {title: 'موبایل', value: user.mobile},
      {title: 'شهر', value: user.city?.name || '—'},
    ]
  }, [user])

  const roleLabels: string[] = useMemo(function () {
    if (!user) return []

    return user.roles.map(({role}) => USER_ROLE_LABELS[role])
  }, [user])

  const accessiblePanels = useMemo(function () {
    if (!user) return []

    const userRoles = user.roles.map(({role}) => role)
    const panels = Object.values(PANELS).filter(panel => {
      return panel.roles.some(role => userRoles.includes(role))
    })

    // ADMIN و CITY_ADMIN هر دو به یک آدرس می‌روند؛ تکراری حذف می‌شود
    return panels.filter((panel, index) => {
      return panels.findIndex(item => item.link === panel.link) === index
    })
  }, [user])

  const {
    open: logoutModalOpen, openModalHandler, closeModal: closeLogoutModal, shouldBeRemoved
  } = useModalOpenBoolean(false)

  const {logoutHandler} = useLogout()

  return (
    <PanelLayout hasBack>
      <PageTitle>
        پروفایل من
      </PageTitle>

      <RenderLogic error={error} isLoading={isFetching}>
        {user && (
          <div className='flex flex-col gap-y-4'>
            <ReportCard title='اطلاعات من' keyValues={infoKeyValues}/>

            <Card>
              <p className='text-center font-semibold pb-2'>
                نقش‌های من
              </p>

              <div className='flex flex-wrap items-center justify-center gap-2'>
                {roleLabels.map(label => (
                  <Chips key={label} text={label}/>
                ))}
              </div>
            </Card>

            <Card>
              <p className='text-center font-semibold pb-2'>
                پنل‌های من
              </p>

              {accessiblePanels.length === 0 ? (
                <p className='text-sm text-gray-500 text-center'>
                  به هیچ پنلی دسترسی ندارید
                </p>
              ) : (
                <div className='flex flex-col'>
                  {accessiblePanels.map(panel => (
                    <CardRowLink key={panel.link} link={panel.link}>
                      {panel.label}
                    </CardRowLink>
                  ))}
                </div>
              )}
            </Card>

            <Button
              variant='outlined' color='red' fullWidth
              rightIcon={<LogoutIcon textColor='text-red-500'/>}
              onClick={openModalHandler}
            >
              خروج از حساب
            </Button>
          </div>
        )}
      </RenderLogic>

      {!shouldBeRemoved && (
        <Modal
          open={logoutModalOpen} onClose={closeLogoutModal}
          title='خروج از حساب'
          description='آیا می‌خواهید از حساب کاربری خود خارج شوید؟'
        >
          <YesNoButtonsModal
            yesText='بله، خارج شو'
            noText='انصراف'
            yesColorButton='red'
            yesOnClick={logoutHandler}
            noOnClick={closeLogoutModal}
          />
        </Modal>
      )}
    </PanelLayout>
  );
}

export default ProfilePage;
