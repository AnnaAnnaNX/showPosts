import { URL } from '@/consts'; 

const getRequest = async (requestPath) => {
    const response = await fetch(`${URL}${requestPath}`);
    return response.json();
}

const getIdsFromLocalStorage = () => {
    try {
        return JSON.parse(localStorage.getItem('ids')) || [];
      } catch (e) {
        return [];
      }
}

const setIdToLocalStorage = (id) => {
    try {
        const ids = getIdsFromLocalStorage();
        if (!ids.includes(id)) {
            localStorage.setItem('ids', JSON.stringify([...ids, id]));
        }
    } catch (e) {
        //
    }
}

const formatTitle = (id, title) => (`#${id}. ${title}`)

export {
    getRequest,
    getIdsFromLocalStorage,
    setIdToLocalStorage,
    formatTitle
}