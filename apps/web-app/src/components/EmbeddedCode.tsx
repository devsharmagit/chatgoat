"use client"
import React from 'react'
import { Button } from './ui/button'
import { Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { funky  } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useToast } from '@/hooks/use-toast';

const EmbeddedCode = ({codeString}:{codeString: string}) => {
    const { toast } = useToast()

    const handleClick = ()=>{
        window.navigator.clipboard.writeText(codeString)
        toast({
            variant: "success",
            title: "Copied!",
            description: "Successfully Copied the code!"
        })
    }

  return (
    <>
      <div>
      <div className="flex justify-between">

      <h2 className="text-2xl font-bold">
Embbed Code in your website.
      </h2>
      <Button onClick={handleClick} variant={"outline"} className="flex gap-2 border-white border-opacity-20 hover:bg-[#6e4451]">
<Copy width={20} height={20} /> Copy
      </Button>
      </div>

      <SyntaxHighlighter language="html" style={funky} className="w-full no-scrollbar" customStyle={{ lineHeight: "1.5",
                fontSize: "1rem",
                borderRadius: "5px",
                backgroundColor: "#000",
                padding: "20px",}}>
      {codeString}
    </SyntaxHighlighter>
      </div>
    </>
  )
}

export default EmbeddedCode
