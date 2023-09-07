import axios from "axios";

export const getAllTrips = async () => {
    try {
        const { data } = await axios.get('http://127.0.0.1:3000/api/trips')
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
};
