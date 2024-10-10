import { Minimize2 } from "lucide-react"

const Header = ({name, closeChat}:{name: string, closeChat:()=>void}) => {
    
  return (
    <div className=' text-white  px-2 py-1 bg-red-500 rounded-tl-md rounded-tr-md flex justify-between items-center'>
        <p className="font-semibold text-xl">
      {name}
        </p>
<button onClick={closeChat} className="px-0 py-0" >
<Minimize2 height={20} width={20} className="text-white" />
</button>
    </div>
  )
}

export default Header
