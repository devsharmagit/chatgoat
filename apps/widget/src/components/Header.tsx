import { Minimize2 } from "lucide-react"
import { Button } from "./ui/button"


const Header = ({name, closeChat}:{name: string, closeChat:()=>void}) => {
    
  return (
    <div className=' text-white  px-2 py-1 bg-destructive rounded-tl-md rounded-tr-md flex justify-between items-center'>
        <p className="font-semibold text-xl">
      {name}
        </p>
<Button onClick={closeChat} variant={"link"} className="px-0 py-0" >
<Minimize2 height={20} width={20} className="text-white" />
</Button>
    </div>
  )
}

export default Header
