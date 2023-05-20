import Cookies from 'js-cookie'

export const GetUserIdByCookies = (): number => {
  return Cookies.get('UserId') ? Number(Cookies.get('UserId')) : -1
}
