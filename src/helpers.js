import { URL } from '@/consts'; 

const getRequest = async (requestPath) => {
    const response = await fetch(URL + requestPath);
    return response.json();
}

const getIdsFromLocalStorage = () => {
    try {
        return JSON.parse(localStorage.getItem('ids')) || [];
      } catch (e) {
        console.lof(e);
        return [];
      }
}

const setIdsToLocalStorage = (ids) => {
    try {
        localStorage.setItem('ids', JSON.stringify([ids]))
    } catch (e) {
        //
    }
}

const formatTitle = (id, title) => (`#${id}. ${title}`)

export {
    getRequest,
    getIdsFromLocalStorage,
    setIdsToLocalStorage,
    formatTitle
}