import { motion } from "framer-motion";
import { Divider } from "@/components/ui/divider";
import { HTMLAttributes } from "react";

interface PopopProps extends HTMLAttributes<HTMLDivElement> {
  title: string
}

export default function Popup({ title, ...props }: PopopProps) {
  return (
    <motion.div
      className={`
        text-center rounded-lg bg-background border-2 
        border-x-4 border-border border-x-primary z-10 grid gap-y-4 py-4 ${props.className}
      `}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
    >
      <h2 className="text-lg">Form Created Successfully</h2>
      <Divider className="border-primary" />
      { props.children }
    </motion.div>
  )
}