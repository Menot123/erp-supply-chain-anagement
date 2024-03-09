import React from 'react'
import './Home.scss'
import { toast } from 'react-toastify'

function Home() {
    const handleToast = () => {
        toast.success('Hi guys')
    }
    return (
        <>
            <div>Home</div>
            <button onClick={() => handleToast()}>Toast</button>
        </>
    )
}

export default Home