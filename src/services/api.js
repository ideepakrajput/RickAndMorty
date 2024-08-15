import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (filters) => {
    const { status, species, gender, page, name, type } = filters;
    let url = `${BASE_URL}/character/?page=${page}`;
    
    if (status && status !== "All") url += `&status=${status}`;
    if (species && species !== "All") url += `&species=${species}`;
    if (gender && gender !== "All") url += `&gender=${gender}`;
    if (name) url += `&name=${name}`;
    if (type) url += `&type=${type}`;

    console.log(url);
    

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data.error === "There is nothing here") {
            return [{}];
        }
        console.error('Error fetching characters:', error);
        return [];
    }
};
