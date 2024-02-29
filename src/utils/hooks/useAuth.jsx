import { useContext } from 'react'
import AuthContext from '../services/AuthProvider'

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth