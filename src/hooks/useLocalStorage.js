import {useState, useEffect} from 'react';

const useLocalStorage = (key, nilaiAwal) => {
    const [nilai,setNilai] = useState(() => {
        const tersimpan = localStorage.getItem(key);
        return tersimpan ? JSON.parse(tersimpan) : nilaiAwal;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(nilai));
    }, [key, nilai]);

    return [nilai, setNilai];
}

export default useLocalStorage;