import { apiAxios } from './axios';
import Cookies from 'universal-cookie';
export const getUserByAccessToken = async () => {
    return apiAxios
        .get('api/auth/user-profile')
        .then((res) => {
            console.log(res.data);
            if (res.status === 200) {
                return res.data;
            }
            return null;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const login = async (email: string, password: string) => {
    const cookies = new Cookies();
    let bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    return apiAxios
        .post('api/auth/login', bodyFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res) => {
            if (res.status === 200) {
                cookies.set('access_token', res.data.access_token, { path: '/' });
                return res.data.user;
            }
        });
};
