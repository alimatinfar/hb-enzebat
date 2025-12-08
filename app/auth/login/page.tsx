'use client'

import React, {useCallback, useEffect} from 'react';
import useReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import LoginLayout from "@/components/layouts/LoginLayout";
import {useRouter} from "next/navigation";
import useMutateData from "@/request/hooks/useMutateData";
import APIES from "@/request/constances/apies";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";
import UserNameField, {userNameFieldName, UserNameFieldType} from "@/components/pages/auth/FormFields/UserNameField";
import PasswordField, {passwordFieldName, PasswordFieldType} from "@/components/pages/auth/FormFields/PasswordField";

type FormDataType = {
  [userNameFieldName]: UserNameFieldType;
  [passwordFieldName]: PasswordFieldType;
}

type BodyDataType = {
  mobile: string;
}

export default function LoginPage() {

  const {mutate, isPending} = useMutateData<NextSuccessResponseProps<any>, BodyDataType>({
    axiosConfig: {
      url: APIES.RESERVATION_SEND_OTP, method: 'POST'
    },
  })

  const router = useRouter()

  const onSubmitHandler = useCallback(function (formData: FormDataType) {
    // router.push(ROUTER_LINKS.OTP)

    // const mobile = formData[mobileNumberFieldName]
    // const data: BodyDataType = {
    //   mobile
    // }
    //
    // const goToOTPPage = () => router.push(ROUTER_LINKS.RESERVATION_OTP)
    //
    // mutate(data, {
    //   onSuccess: async (response) => {
    //     SS.set(SS_KEYS.MOBILE, mobile)
    //     // await toastPromise().then((toast: any) => toast.success(response.message))
    //     goToOTPPage()
    //   },
    //   onError: async (error: any) => {
    //     if (getErrorStatus(error) === 429) goToOTPPage()
    //   }
    // })
  }, [])

  const {
    formMethods, onSubmit
  } = useReactHookFormWrapper<FormDataType>({
    onSubmitHandler
  })

  return (
    <LoginLayout
      title='ورود' subTitle='سلام!' description='برای ورود لطفا نام کاربری و رمز عبور خود را وارد نمایید'
      btnTitle='ادامه' formMethods={formMethods} onSubmit={onSubmit} loading={isPending}
    >
      <UserNameField/>

      <PasswordField />
    </LoginLayout>
  );
}
