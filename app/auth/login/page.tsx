'use client'

import React, {useCallback} from 'react';
import useReactHookFormWrapper from "@/components/Form/FormLayout/ReactHookFormWrapper/hooks/useReactHookFormWrapper";
import LoginLayout from "@/components/layouts/LoginLayout";
import {useRouter} from "next/navigation";
import useMutateData from "@/request/hooks/useMutateData";
import APIES from "@/request/constances/apies";
import {NextSuccessResponseProps} from "@/utils/backend/response/NextSuccessResponse";
import MobileField, {MobileFieldType, mobileFieldName} from "@/components/pages/auth/FormFields/MobileField";
import PasswordField, {passwordFieldName, PasswordFieldType} from "@/components/pages/auth/FormFields/PasswordField";
import ROUTER_LINKS from "@/constances/routerLinks";
import setToken from "@/utils/authentication/setToken";
import useGoToPanel from "@/hooks/useGoToPanel";

type FormDataType = {
  [mobileFieldName]: MobileFieldType;
  [passwordFieldName]: PasswordFieldType;
}

type BodyDataType = {
  mobile: string;
  password: string;
}

export default function LoginPage() {

  const {mutate, isPending} = useMutateData<NextSuccessResponseProps<any>, BodyDataType>({
    axiosConfig: {
      url: APIES.LOGIN, method: 'POST'
    },
  })

  const {goToPanel} = useGoToPanel()

  const onSubmitHandler = useCallback(function (formData: FormDataType) {
    const data: BodyDataType = {
      mobile: formData[mobileFieldName],
      password: formData[passwordFieldName]
    }

    mutate(data, {
      onSuccess: async (response) => {
        setToken(response?.token)
        goToPanel()
      },
    })
  }, [mutate, goToPanel])

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
      <MobileField/>

      <PasswordField />
    </LoginLayout>
  );
}
