import Image from "next/image";

const HeaderBarDefault = () => {
    return (
        <div
            className={`fixed top-0 flex min-h-[4em] items-center border bg-[#4792e6] 
        w-full justify-center pl-8 pr-8 border-spacing-2`}
        >
            <div className={`flex w-[1000px] justify-between`}>
                <div>
                    <Image
                        src={`/images/clock3.png`}
                        alt={`Ícone de Clock`}
                        height={40}
                        width={40}
                        priority={true}
                    />
                </div>
                <div></div>
                <div className={`justify-center items-center flex`}></div>
            </div>
        </div>
    );
};

export default HeaderBarDefault;
