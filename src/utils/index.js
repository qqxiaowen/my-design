import axios from 'axios'
import { Toast } from 'mint-ui';
import router from '../router/index'

const env = process.env.NODE_ENV
const baseURL = env == 'development' ? '/api' : '/'

var instance = axios.create({
    baseURL,
    timeout: 15000,
});


export const  $axios = {
    get(url, data, config){
        return new Promise((resolve, rejects) => {
            instance.get(url, {params:data, ...config}).then(res => {
                if(res.data.code == 401){
                    Toast(res.data.msg);
                    router.push('/login')
                }
                resolve(res.data)
            }).catch(err =>{
                rejects(err)
            })
        })
    },
    fetch(url,data,config,methods){
        return new Promise((resolve, rejects) => {
            instance[methods](url, data, config).then(res => {
                if(res.data.code == 401){
                    Toast(res.data.msg);
                    router.push('/login')
                }
                resolve(res.data)
            }).catch(err => {
                rejects(err)
            })
        })
    },
    post(url,data,config){
        return this.fetch(url,data,config, 'post')
    },
    put(url,data,config){
        return this.fetch(url,data,config, 'put')
    }
}