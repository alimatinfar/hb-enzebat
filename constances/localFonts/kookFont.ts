import localFont from 'next/font/local'


const kookFont = localFont({
  src: [
    {
      path: '../../assets/fonts/kook/KookFaNum-ExtraLight.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/kook/KookFaNum-Light.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/kook/KookFaNum-Regular.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/kook/KookFaNum-Medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/kook/KookFaNum-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../assets/fonts/kook/KookFaNum-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-kook',
})

export default kookFont