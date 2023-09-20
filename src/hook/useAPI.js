import React from 'react'
import { useState , useEffect } from 'react'

const BASE_URL = 'https://us-central1-skooldio-react-hooks.cloudfunctions.net' //ใส่ URL ต้นทางของ Database



const useAPI = (path) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    //ดึง URL มาแล้วใส่ path ที่ต้องการเพื่อดึงข้อมูลมาใชช้
    useEffect(() => {
        setLoading(true);
        fetch(BASE_URL + path)
            .then((resp) => resp.json())
            .then((data) => {
                setData(data);
                setLoading(false)
            });
    },[])

  return { data, loading };
}

export default useAPI