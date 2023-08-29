import axios from 'axios';
import http from "../utils/http-client";
import authService from "./authService";
const BASE_URL = "http://localhost:9091/api";
const BASE_URL2 = "http://localhost:9091/api/userDashboard";
const authUser = authService.getAuthUser();

class userService{
    saveUser(user){
        return axios.post(`${BASE_URL}/openaccount`,user);
    }
    saveUserId(user){
        return http.post(`${BASE_URL}/register`,user);
    }
    getUsers(){
        return axios.get(`${BASE_URL}/userlist`);
    }
    getUser(userId){
        return http.get(`${BASE_URL2}/${userId}`)
    }
    fundTransfer(data){
        return http.post(`${BASE_URL2}/fundTransfer/${authUser?.userId}`,data);
    }
    getUserTransaction(userId){
        return http.get(`${BASE_URL2}/showTransactions/${userId}`);
    }
    addBeneficiary(data){
        return http.post(`${BASE_URL2}/addBeneficiary/${authUser?.userId}`,data);
    }
    getBeneficiaries(userId){
        return http.get(`${BASE_URL2}/showBeneficiary/${userId}`);
    }
    postWithdrawal(data){
        return http.post(`${BASE_URL2}/withdrawl/${authUser?.userId}`,data);
    }
    getPendingUsers(){
        return http.get(`${BASE_URL}/admin/userlist_requested`);
    }
    getApprovedUsers(){
        return http.get(`${BASE_URL}/admin/userlist_approved`);
    }
    postPendingUsers(data){
        return http.post(`${BASE_URL}/admin/userlist_requested`,data);
    }
    deletePendingUsers(accNo){
        return axios.delete(`${BASE_URL}/admin/userlist_requested/${accNo}`);
    }
}

export default new userService();
