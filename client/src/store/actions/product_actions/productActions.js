import axios from 'axios';
import {GET_PRODUCTS_BY_SALE} from '../types';
import {GET_PRODUCTS_BY_ARRIVAL} from '../types';  
import {GET_BRANDS, GET_WOODS} from '../types'; 
import {GET_SHOP_PRODUCTS, ADD_PRODUCT, CLEAR_PRODUCT, ADD_BRAND, 
    ADD_WOOD, GET_PRODUCT_DETAIL, CLEAR_PRODUCT_DETAIL} from '../types';  

import {PRODUCT_SERVER}  from '../../../components/utils/misc';

export function getProductsByArrival (){
    // BY ARRIVAL
    // /articles?sortBY=createdAt&order=desc&limit=4

  
    const req = axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
        .then(res => {
            return res.data;
        })
    return {
        type: GET_PRODUCTS_BY_ARRIVAL,
        payload: req
    }
}

export function getProductsBySale (){
      // BY SALE
    // /articles?sortBy=sold&order=desc&limit=100&skip=5
    const req = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
        .then(res => {
            return res.data
        });
    return {
        type: GET_PRODUCTS_BY_SALE,
        payload: req
    }
}

// ///////////////////////////
//          CATEGORIES
// //////////////////////////

export const getBrands = () => {
    const req = axios.get(`${PRODUCT_SERVER}/get_brands`).then(res => {
        return res.data
    });

    return {
        type: GET_BRANDS,
        payload: req
    }
   
}
export const getWoods = () => {
    const req = axios.get(`${PRODUCT_SERVER}/woods`).then(res => res.data);
   

    return {
        type: GET_WOODS,
        payload: req
    }
}

// //////////////////
// //  SHOP /////////
// /////////////////
 
export const getProductsToShop = (skip, limit, filters=[], previousState=[]) => {
    const data = {
        limit,
        skip,
        filters
    }

    const req = axios.post(`${PRODUCT_SERVER}/shop`, data)
                            .then(response => {
                                let newState = [
                                    ...previousState,
                                    ...response.data.articles
                                ]
                                return {
                                    size: response.data.articles,
                                    articles: newState
                                }
                            })
    return {
        type: GET_SHOP_PRODUCTS,
        payload: req
    }
}

// ADD PRODUCTS
export const addProduct = (dataToSubmit) => {
    const req = axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit)
        .then(res => {
            return res.data;
        })
    return {
        type: ADD_PRODUCT,
        payload: req
    }
}

export const clearProduct  = () => {
    return {
        type: CLEAR_PRODUCT,
        payload: ''
    }
}

export const addBrand = (dataToSubmit, existingBrands) => {
    console.log(existingBrands);
    const req = axios.post(`${PRODUCT_SERVER}/brand` , dataToSubmit)
            .then(res => {
                let brands = [
                    ...existingBrands,
                    res.data.brandData
                ];

                return {
                    success: res.data.success, 
                    brands
                }
            }).catch(err => {
                return "Something went wrong with your code"
            })
    return {
        type: ADD_BRAND,
        payload: req
    }
}
export const addWood = (dataToSubmit, existingWoods) => {
    console.log(existingWoods);
    const req = axios.post(`${PRODUCT_SERVER}/wood` , dataToSubmit)
            .then(res => {
                let woods = [
                    ...existingWoods,
                    res.data.wood
                ];

                return {
                    success: res.data.success, 
                    woods
                }
            }).catch(err => {
                return "Something went wrong with your code"
            })
    return {
        type: ADD_WOOD,
        payload: req
    }
}

export const getProdcutDetail = (id) => {
    const req = axios.get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
        .then(res => {
            return res.data[0];
        });
    
        return {
            type: GET_PRODUCT_DETAIL,
            payload: req
        }
}

export const clearProductDetail = () => {
    return {
        type: CLEAR_PRODUCT_DETAIL,
        payload: ''
    }
}