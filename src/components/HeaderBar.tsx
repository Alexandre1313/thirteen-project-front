import Image from "next/image"
import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"

const HeaderBar = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className={`fixed top-0 flex min-h-[60px] items-center bg-[#4792e6] 
        w-full justify-center pl-8 pr-8 border-spacing-2 z-20`}>
        <div className={`flex w-[1000px] justify-between`}>
            <div>
                <Image
                    src={`/images/clock2.png`}
                    alt={`Ícone de Clock`}
                    height={40}
                    width={40}
                    priority={true}
                />
            </div>            
            <div className={`justify-center items-center flex`}></div>
            <div className={`justify-center items-center flex`}>{user ? 'OLÁ ' + user.name + '!' : 'OLÁ!'}</div>
            </div>
        </div>
    )
}

export default HeaderBar
